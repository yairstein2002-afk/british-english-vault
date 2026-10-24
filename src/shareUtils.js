/**
 * British English Vault - Copy & Share Utilities
 * 100% English
 */

export function showCopyShareToast(message, icon = 'fa-check') {
  let toast = document.getElementById('dw-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dw-toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toast.className = 'dw-toast show';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = 'dw-toast';
  }, 2500);
}

export async function copyTextToClipboard(text, customMsg = 'Copied to clipboard! 📋') {
  if (!text || !text.trim()) {
    showCopyShareToast('Nothing to copy yet!', 'fa-circle-exclamation');
    return false;
  }
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text.trim());
    } else {
      const ta = document.createElement('textarea');
      ta.value = text.trim();
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showCopyShareToast(customMsg, 'fa-clipboard-check');
    return true;
  } catch (e) {
    showCopyShareToast('Failed to copy to clipboard', 'fa-triangle-exclamation');
    return false;
  }
}

export async function shareTextContent(title, text) {
  if (!text || !text.trim()) {
    showCopyShareToast('Nothing to share yet!', 'fa-circle-exclamation');
    return false;
  }
  const clean = text.trim();
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || 'British English Vault',
        text: clean
      });
      showCopyShareToast('Shared successfully!', 'fa-paper-plane');
      return true;
    } catch (err) {
      if (err.name === 'AbortError') return false;
    }
  }
  return copyTextToClipboard(clean, 'Shareable text copied to clipboard! 📋');
}
