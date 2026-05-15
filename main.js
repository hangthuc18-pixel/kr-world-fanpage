// ==========================================
// 1. CHUYỂN TRANG (TAB SWITCHING)
// ==========================================
function switchTab(tabId, element) {
    // Ẩn tất cả các trang
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Hiện trang được bấm
    document.getElementById(tabId).classList.add('active');

    // Cập nhật trạng thái 'active' (sáng màu) trên thanh menu
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => link.classList.remove('active'));
    if(element) element.classList.add('active');

    // Nếu đang ở mobile, chọn xong thì đóng menu đi
    const navMenu = document.getElementById('nav-links');
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
    }
    
    // Reset window scroll lên đầu trang
    window.scrollTo(0, 0);
}

// ==========================================
// 2. TOGGLE MENU MOBILE
// ==========================================
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}

// ==========================================
// 3. XỬ LÝ SLIDER (HOME)
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

// Hàm chuyển ảnh
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active')); // Xóa active
    
    // Tính toán lại vòng lặp (nếu qua trái ảnh 1 thì quay lại ảnh cuối)
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active'); // Gắn active cho ảnh mới
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Bấm nút trái / phải
function changeSlide(step) {
    showSlide(currentSlide + step);
}

// Tự động chạy mỗi 3.5 giây
function startSlider() {
    slideInterval = setInterval(nextSlide, 3500);
}

// Dừng Slider
function pauseSlider() {
    clearInterval(slideInterval);
}

// Kích hoạt Slider
startSlider();

// Bắt sự kiện Rê chuột vào/Ra khỏi slider để Dừng/Chạy tiếp
const sliderWrapper = document.getElementById('slider-wrapper');
if(sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', pauseSlider);
    sliderWrapper.addEventListener('mouseleave', startSlider);
}

// ==========================================
// 4. MỞ THÔNG TIN RIDER / FORM (Mô phỏng)
// ==========================================
function openDetail(name) {
    // Đây là mô phỏng khi bạn bấm vào 1 Rider hoặc Form
    // Thực tế bạn có thể dùng lệnh: window.location.href = "tên-file.html";
    alert(`Đang mở trang thông tin chi tiết của: ${name}`);
}

// ==========================================
// 5. ACCORDION (RIDER SYSTEMS)
// ==========================================
function toggleAccordion(element) {
    // 1. (Tùy chọn) Đóng tất cả các tab khác trước khi mở tab mới
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
            const otherIcon = item.querySelector('.icon');
            if (otherIcon) otherIcon.innerText = "+";
        }
    });

    // 2. Bật/Tắt trạng thái active cho tab hiện tại
    element.classList.toggle('active');

    // 3. Thay đổi nội dung icon giữa + và -
    const icon = element.querySelector('.icon');
    if (icon) {
        if (element.classList.contains('active')) {
            icon.innerText = "-";
        } else {
            icon.innerText = "+";
        }
    }
}

// ==========================================
// 6. XỬ LÝ TỰ ĐỘNG MỞ TAB KHI URL CÓ CHỨA HASH (VD: #riders, #home)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Lấy phần đuôi của URL (ví dụ: #riders)
    const hash = window.location.hash; 
    
    if (hash) {
        const tabId = hash.replace('#', ''); // Xóa dấu # đi để lấy chữ 'riders'
        const tabElement = document.getElementById(tabId);
        
        // Tìm cái nút trên thanh menu tương ứng với tab đó
        const menuLink = document.querySelector(`.nav-links a[href="${hash}"]`);
        
        // Nếu tìm thấy tab, gọi hàm switchTab để mở nó lên ngay lập tức
        if (tabElement) {
            switchTab(tabId, menuLink);
        }
    }
});