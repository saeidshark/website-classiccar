// addresses_crud.js
const addressApi = 'php/addresses_api.php';

// نمایش آدرس‌ها برای کاربر خاص
function fetchAddresses(userId) {
  fetch(`${addressApi}?user_id=${userId}`)
    .then(res => res.json())
    .then(addresses => {
      const tbody = document.getElementById('address-body');
      tbody.innerHTML = '';
      addresses.forEach(a => {
        tbody.innerHTML += `
          <tr>
            <td>${a.id}</td>
            <td>${a.recipient_name}</td>
            <td>${a.phone}</td>
            <td>${a.full_address}</td>
            <td>${a.city}</td>
            <td>${a.province}</td>
            <td>
              <button onclick="editAddress(${a.id})">✏️</button>
              <button onclick="deleteAddress(${a.id})">🗑️</button>
            </td>
          </tr>
        `;
      });
    });
}

// ثبت آدرس جدید
function addAddress(address) {
  fetch(addressApi, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address)
  }).then(() => fetchAddresses(address.user_id));
}

// ویرایش آدرس
function updateAddress(address) {
  fetch(addressApi, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address)
  }).then(() => fetchAddresses(address.user_id));
}

// حذف آدرس
function deleteAddress(id) {
  const userId = localStorage.getItem('user_id');
  fetch(addressApi, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  }).then(() => fetchAddresses(userId));
}

// ویرایش یک آدرس: پر کردن فرم
function editAddress(id) {
  fetch(`${addressApi}?user_id=${userId}`)
    .then(res => res.json())
    .then(addresses => {
      const address = addresses.find(a => a.id == id);
      if (!address) return alert('آدرس پیدا نشد');

      document.getElementById('form-title').textContent = 'ویرایش آدرس';
      document.getElementById('address-id').value = address.id;
      document.getElementById('receiver').value = address.recipient_name;
      document.getElementById('phone').value = address.phone;
      document.getElementById('full_address').value = address.full_address;
      document.getElementById('city').value = address.city;
      document.getElementById('province').value = address.province;

      document.getElementById('address-form').style.display = 'block';
    });
}

// ذخیره آدرس (جدید یا ویرایش‌شده)
function saveAddress(event) {
  event.preventDefault();

  const id = document.getElementById('address-id').value;
  const userId = localStorage.getItem('user_id');
  const address = {
    id: id,
    user_id: userId,
    recipient_name: document.getElementById('receiver').value,
    phone: document.getElementById('phone').value,
    full_address: document.getElementById('full_address').value,
    city: document.getElementById('city').value,
    province: document.getElementById('province').value
  };

  if (id) {
    updateAddress(address);
  } else {
    addAddress(address);
  }

  // بعد از ذخیره، فرم را پنهان و مقدارها را پاک کن
  document.getElementById('address-form').style.display = 'none';
  document.querySelector('#address-form form').reset();

  console.log('Sending address:', address);


  cancelEdit();
}

// لغو ویرایش و بازنشانی فرم
function cancelEdit() {
  document.getElementById('form-title').textContent = 'افزودن آدرس';
  document.getElementById('address-id').value = '';
  document.getElementById('receiver').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('full_address').value = '';
  document.getElementById('city').value = '';
  document.getElementById('province').value = '';
  document.getElementById('address-form').style.display = 'none';
}

// مقداردهی اولیه
const userId = localStorage.getItem('user_id');
if (userId) fetchAddresses(userId);

// باز کردن فرم برای افزودن آدرس جدید
function openAddressForm() {
  cancelEdit();
  document.getElementById('address-form').style.display = 'block';
}
window.saveAddress = saveAddress;
