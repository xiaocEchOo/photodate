const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const redrawBtn = document.getElementById('redrawBtn');
const calendarTypeSelect = document.getElementById('calendarType');
const yearInput = document.getElementById('year');
const monthTextInput = document.getElementById('monthText');

let currentImage = null;
let weekNames = ['一', '二', '三', '四', '五', '六', '日'];

// 上传图片
uploadBtn.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    currentImage = img;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
  img.src = URL.createObjectURL(file);
});

// 刷新日历
redrawBtn.addEventListener('click', drawCalendar);

function drawCalendar() {
  if (!currentImage) return alert('请先上传图片');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImage, 0, 0);

  const year = parseInt(yearInput.value);
  const monthText = monthTextInput.value;
  const type = calendarTypeSelect.value;

  // 基础样式
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 40, 280, 320);
  ctx.fillStyle = '#222';
  ctx.font = '24px sans-serif';
  ctx.fillText(monthText, 50, 70);

  if (type === 'month') {
    drawMonthCalendar(year);
  }
}

// 绘制月历
function drawMonthCalendar(year) {
  const month = new Date().getMonth() + 1;
  let x = 50;
  let y = 110;

  // 星期标题
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#666';
  for (let wd = 0; wd < 7; wd++) {
    ctx.fillText(weekNames[wd], x + wd * 40, y);
  }

  // 日期
  y += 30;
  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#000';

  const firstDay = new Date(year, month - 1, 1).getDay() || 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  let day = 1;

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay - 1) continue;
      if (day > daysInMonth) break;
      ctx.fillText(day, x + col * 40, y);
      day++;
    }
    y += 36;
  }
}