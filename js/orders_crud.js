// CRUD برای سفارش‌ها
const orderApi = 'php/orders_api.php';

// نمایش سفارش‌ها (فقط سفارش‌های یک کاربر خاص)
function fetchOrders(userId) {
    fetch(`${orderApi}?user_id=${userId}`)
        .then(res => res.json())
        .then(orders => {
            const tbody = document.getElementById('orders-body');
            tbody.innerHTML = '';
            orders.forEach(o => {
                tbody.innerHTML += `
                    <tr>
                        <td>${o.id}</td>
                        <td>${o.product_id}</td>
                        <td>${o.order_date}</td>
                        <td>${o.status}</td>
                    </tr>
                `;
            });
        });
}

// ثبت سفارش جدید
function placeOrder(order) {
    fetch(orderApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }).then(() => alert('سفارش ثبت شد!'));
}

// ویرایش سفارش
function updateOrderStatus(orderId, status) {
    fetch(orderApi, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status })
    }).then(() => alert('وضعیت به‌روز شد'));
}

// حذف سفارش
function deleteOrder(orderId) {
    fetch(orderApi, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId })
    }).then(() => alert('سفارش حذف شد'));
}
