// Central runner for all pages
// runCode(button) renders the textarea sibling into the iframe.srcdoc
function runCode(button) {
  try {
    // find the nearest .code-box parent then its textarea and iframe
    var container = button.parentElement.parentElement; // .code-box
    var textarea = container.querySelector('.code-input');
    var iframe = container.querySelector('.output');

    if (!textarea || !iframe) {
      console.warn('runCode: textarea or iframe not found');
      return;
    }

    // copy code
    var code = textarea.value;

    // if code contains only body fragment (no <!doctype>), it's fine: srcdoc will render
    iframe.srcdoc = code;
  } catch (err) {
    console.error('runCode error', err);
  }
}

// Optional: make Enter+Ctrl run inside editors (user convenience)
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    var active = document.activeElement;
    if (active && active.classList && active.classList.contains('code-input')) {
      // find run button inside same code-box
      var codeBox = active.closest('.code-box');
      if (codeBox) {
        var btn = codeBox.querySelector('.run-btn');
        if (btn) btn.click();
      }
    }
  }
});
