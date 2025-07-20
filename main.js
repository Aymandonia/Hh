// DOM Elements
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const loadingSpinner = document.getElementById('loadingSpinner');

// Event Listeners
searchForm.addEventListener('submit', handleSearch);

// Search Handler
async function handleSearch(e) {
    e.preventDefault();
    
    // Get form values
    const martyrName = document.getElementById('martyrName').value.trim();
    const applicantName = document.getElementById('applicantName').value.trim();
    
    // Validate inputs
    if (!martyrName || !applicantName) {
        showError('الرجاء إدخال جميع البيانات المطلوبة');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        // Search in data
        const result = searchInDatabase(martyrName, applicantName);
        
        // Hide loading
        hideLoading();
        
        // Display results
        displayResults(result, martyrName, applicantName);
    }, 1500);
}

// Search in Database
function searchInDatabase(martyrName, applicantName) {
    // Search in the martyrsData array (from data.js)
    const result = martyrsData.find(record => 
        record.martyrName.toLowerCase() === martyrName.toLowerCase() &&
        record.applicantName.toLowerCase() === applicantName.toLowerCase()
    );
    
    return result;
}

// Display Results
function displayResults(result, martyrName, applicantName) {
    resultsSection.classList.remove('hidden');
    
    if (result) {
        // Success - Record found
        resultsContainer.innerHTML = `
            <div class="result-card ${result.status}">
                <div class="result-header">
                    <div class="status-icon">
                        ${getStatusIcon(result.status)}
                    </div>
                    <h2 class="result-title">${getStatusText(result.status)}</h2>
                </div>
                <div class="result-details">
                    <div class="detail-row">
                        <span class="detail-label">اسم الشهيد:</span>
                        <span>${result.martyrName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">اسم مقدم الطلب:</span>
                        <span>${result.applicantName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">رقم الطلب:</span>
                        <span>${result.requestNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">تاريخ التقديم:</span>
                        <span>${result.submissionDate}</span>
                    </div>
                    ${result.exportDate ? `
                        <div class="detail-row">
                            <span class="detail-label">تاريخ التصدير:</span>
                            <span>${result.exportDate}</span>
                        </div>
                    ` : ''}
                    ${result.notes ? `
                        <div class="detail-row">
                            <span class="detail-label">ملاحظات:</span>
                            <span>${result.notes}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    } else {
        // No record found
        resultsContainer.innerHTML = `
            <div class="result-card error">
                <div class="result-header">
                    <div class="status-icon">❌</div>
                    <h2 class="result-title">لم يتم العثور على نتائج</h2>
                </div>
                <div class="result-details">
                    <p>لم نتمكن من العثور على طلب مطابق للبيانات المدخلة:</p>
                    <div class="detail-row">
                        <span class="detail-label">اسم الشهيد:</span>
                        <span>${martyrName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">اسم مقدم الطلب:</span>
                        <span>${applicantName}</span>
                    </div>
                    <p style="margin-top: 15px;">الرجاء التأكد من صحة البيانات المدخلة والمحاولة مرة أخرى.</p>
                </div>
            </div>
        `;
    }
}

// Helper Functions
function getStatusIcon(status) {
    switch(status) {
        case 'success':
            return '✅';
        case 'pending':
            return '⏳';
        default:
            return '❌';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'success':
            return 'تم تصدير الكتاب بنجاح';
        case 'pending':
            return 'الطلب قيد المعالجة';
        default:
            return 'حالة غير معروفة';
    }
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
    resultsSection.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    alert(message);
}