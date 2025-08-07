// CRUD برای محصولات
const apiUrl = 'php/products_api.php';

// نمایش لیست محصولات
function fetchProducts() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(products => {
            const list = document.getElementById('product-list');
            list.innerHTML = '';
            products.forEach(p => {
                list.innerHTML += `
                    <div class="product">
                        <img src="${p.image}" alt="${p.name}" />
                        <h3>${p.name}</h3>
                        <p>${p.description}</p>
                        <strong>${p.price} تومان</strong>
                        <button onclick="deleteProduct(${p.id})">🗑 حذف</button>
                    </div>
                `;
            });
        });
}

// افزودن محصول جدید
function addProduct(product) {
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then(() => fetchProducts());
}

// ویرایش محصول
function updateProduct(product) {
    fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then(() => fetchProducts());
}

// حذف محصول
function deleteProduct(id) {
    fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    }).then(() => fetchProducts());
}

// در صورت نیاز، این تابع را در صفحه صدا بزن
// fetchProducts();
