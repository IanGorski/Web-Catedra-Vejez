export function showToast(msg: string, duration = 3500): void {
  let t = document.querySelector<HTMLElement>('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t!.classList.remove('show'), duration);
}
