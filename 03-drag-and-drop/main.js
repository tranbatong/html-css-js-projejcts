const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  //   dragstart: bắt đầu nhấp và di chuyển  một thẻ khi ta để draggale: true
  card.addEventListener("dragend", dragEnd);
  //   dragend: nhả chuột một thẻ khi ta để draggale: true
}
// dragenter: thẻ đang đi vào trong phạm vi
// dragover: thẻ vẫn đang lặp đi lặp lại trong phạm vi
// dragleave: thẻ rời khỏi phạm vi
// drop; thẻ đã được bỏ vào phạm vi
// =>>>>>>>> Thường được dùng vào khu vực thả thẻ, không phải của thẻ
for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag ended");
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
}
