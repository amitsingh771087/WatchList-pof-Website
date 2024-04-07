// highlite  section
// popover with next and previous button

const steps = ["header", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "footer"];
let index = 0;

const highlite = (id) => {
  document.getElementById("lb-highlight")?.remove();
  document.getElementById("lb-popover")?.remove();
  const element = document.getElementById(id);
  scrollTo(element);
  const elementDimension = element.getBoundingClientRect();
  highliteHelper(elementDimension);
  popover(elementDimension);
};

const highliteHelper = (elementDimension) => {
  let top = elementDimension.top + window.scrollY;
  let left = elementDimension.left + window.scrollX;
  let width = elementDimension.width;
  let height = elementDimension.height;

  const ele = document.createElement("div");
  ele.id = "lb-highlight";
  ele.style = `
    position:absolute;
    top:${top - 4}px;
    left:${left - 4}px;
    width:${width}px;
    height:${height}px;
    transition: border .2s ease;

    `;

  document.getElementById("wrapper").appendChild(ele);

  setTimeout(() => {
    ele.style.border = "4px solid #000";
  });
};

const popover = (elementDimension) => {
  let bottom = elementDimension.bottom + window.scrollY;
  let left = elementDimension.left + window.scrollX;
  let right = elementDimension.right;

  const ele = document.createElement("div");
  ele.id = "lb-popover";
  ele.style = `
  position:absolute;
  top:${bottom + 5}px;
  left:${(left + right) / 2 - 50}px;
  background:#fff;
  width:100px;
  height:100px;


  `;
  ele.appendChild(navigationButton());
  document.getElementById("wrapper").appendChild(ele);
};

const navigationButton = () => {
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "next";
  nextBtn.addEventListener("click", function () {
    if (index < steps.length - 1) {
      highlite(steps[++index]);
    }
  });
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "prev";
  prevBtn.addEventListener("click", function () {
    if (index > 0) {
      highlite(steps[--index]);
    }
  });

  const fragment = document.createDocumentFragment();

  fragment.appendChild(prevBtn);
  fragment.appendChild(nextBtn);

  return fragment;
};

const scrollTo = (element) => {
  const eleTop = element.offsetTop;
  window.scrollTo({ top: eleTop, behavior: "smooth" });
};

highlite(steps[index]);
