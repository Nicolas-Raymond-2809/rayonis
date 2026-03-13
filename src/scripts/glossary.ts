import glossary from '../data/glossary.json';

let initialized = false;

export function initGlossary() {
  if (initialized) return;
  initialized = true;

  console.log('Glossary: Initializing...');

  const terms = [...glossary].sort((a, b) => b.term.length - a.term.length);
  
  const regexParts = terms.map(t => {
    const escaped = t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped;
  });
  
  const regex = new RegExp(`(${regexParts.join('|')})`, 'gi');

  console.log('Glossary: Loaded', terms.length, 'terms');

  function walk(node: Node) {
    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue || '';
      if (!text.trim() || text.length < 2) return;

      const parent = node.parentNode as HTMLElement;
      
      if (!parent || 
          parent.closest('.glossary-term') || 
          parent.closest('script') || 
          parent.closest('style') ||
          parent.closest('header') ||
          parent.closest('footer') ||
          parent.closest('nav')) {
        return;
      }

      regex.lastIndex = 0;
      if (regex.test(text)) {
        console.log('Glossary: Potential match in text:', text.substring(0, 50) + '...');
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        
        regex.lastIndex = 0;
        let found = false;
        
        while ((match = regex.exec(text)) !== null) {
          const matchText = match[0];
          const matchIndex = match.index;
          
          // Check boundaries manually - improved for French
          const charBefore = text[matchIndex - 1];
          const charAfter = text[matchIndex + matchText.length];
          
          // A letter is a word character or a French accented character
          const isLetter = (char: string) => char && /[a-zA-Z0-9À-ÿ]/.test(char);
          
          // We skip if it's attached to another letter (part of a larger word)
          // But we ALLOW if it's preceded by an apostrophe (L'IA)
          if ((isLetter(charBefore) && charBefore !== "'") || isLetter(charAfter)) {
            continue;
          }

          found = true;
          // Add text before match
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
          
          const entry = terms.find(t => t.term.toLowerCase() === matchText.toLowerCase());
          
          if (entry) {
            const span = document.createElement('span');
            span.className = 'glossary-term';
            span.setAttribute('data-definition', entry.definition);
            span.textContent = matchText;
            fragment.appendChild(span);
            console.log('Glossary: Applied term ->', matchText);
          } else {
            fragment.appendChild(document.createTextNode(matchText));
          }
          
          lastIndex = regex.lastIndex;
        }
        
        if (found) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
          try {
            parent.replaceChild(fragment, node);
          } catch (e) {
            // Node might have been removed by React in the meantime
          }
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'NAV' || element.tagName === 'HEADER' || element.tagName === 'FOOTER' || element.classList.contains('glossary-term')) {
        return;
      }
      
      const children = Array.from(node.childNodes);
      for (const child of children) {
        walk(child);
      }
    }
  }

  const run = () => {
    const main = document.querySelector('main');
    const target = main || document.body;
    console.log('Glossary: Running on', target.tagName);
    walk(target);
  };

  // Initial run
  run();

  // Observe changes
  const observer = new MutationObserver((mutations) => {
    let shouldRun = false;
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldRun = true;
        break;
      }
    }
    
    if (shouldRun) {
      setTimeout(run, 200); // Small delay to let React finish
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initGlossary();
  } else {
    window.addEventListener('load', initGlossary);
  }
}
