function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((sec) => {
    sec.classList.remove("active");
    sec.classList.add("hidden");
  });

  const selected = document.getElementById(id);
  selected.classList.add("active");
  selected.classList.remove("hidden");
}

const ctx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
    datasets: [{
      label: 'Doanh số (VND)',
      data: [3000000, 5000000, 4200000, 6000000],
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function importFromExcel(event, tableId) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = ""; // clear existing
    sheet.forEach(row => {
      const tr = document.createElement("tr");
      Object.values(row).forEach(val => {
        const td = document.createElement("td");
        td.textContent = val;
        tr.appendChild(td);
      });

      // Add action column
      const action = document.createElement("td");
      action.innerHTML = `<button onclick="editRow(this)">Sửa</button> <button onclick="deleteRow(this)">Xóa</button>`;
      tr.appendChild(action);
      tbody.appendChild(tr);
    });
  };

  reader.readAsArrayBuffer(file);
}

function editRow(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");
  let formHtml = "";

  cells.forEach((cell, index) => {
    if (index < cells.length - 1) {
      formHtml += `<label>Field ${index+1}: <input name="field${index}" value="${cell.textContent}" /></label><br>`;
    }
  });

  document.getElementById("data-form").innerHTML = formHtml + `<button type="submit">Lưu</button>`;
  document.getElementById("form-title").textContent = "Sửa dữ liệu";
  document.getElementById("form-modal").classList.remove("hidden");
}

function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
}

function openForm(formId) {
  document.getElementById("form-title").textContent = "Thêm dữ liệu";
  document.getElementById("data-form").innerHTML = `
    <label>Tên: <input name="name" /></label><br>
    <label>Email/Giá: <input name="info" /></label><br>
    <label>Ca làm/Tồn kho: <input name="extra" /></label><br>
    <button type="submit">Thêm</button>
  `;
  document.getElementById("form-modal").classList.remove("hidden");
}

function closeForm() {
  document.getElementById("form-modal").classList.add("hidden");
}
