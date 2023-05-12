export default function otherClick(setOption: Function) {
  document.addEventListener("mousedown", (e: MouseEvent) => {
    if (e.target) {
      const target = e.target as Element;
      if (!target.classList.contains("option")) setOption(false);
    }
  });
}
