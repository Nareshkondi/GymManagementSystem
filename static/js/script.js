document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fixed navigation on scroll
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > headerHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });

    // Form validation for login and registration
    const loginForm = document.querySelector('#login form');
    const registerForm = document.querySelector('#register form');

    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', validateRegisterForm);
    }

    function validateLoginForm(e) {
        const username = document.querySelector('#login input[name="username"]').value;
        const password = document.querySelector('#login input[name="password"]').value;

        if (username.trim() === '' || password.trim() === '') {
            e.preventDefault();
            alert('Please fill in all fields');
        }
    }

    function validateRegisterForm(e) {
        const username = document.querySelector('#register input[name="username"]').value;
        const email = document.querySelector('#register input[name="email"]').value;
        const password = document.querySelector('#register input[name="password"]').value;
        const phone = document.querySelector('#register input[name="phone"]').value;
        const height = document.querySelector('#register input[name="height"]').value;
        const weight = document.querySelector('#register input[name="weight"]').value;
        const role = document.querySelector('#register select[name="role"]').value;

        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || 
            phone.trim() === '' || height.trim() === '' || weight.trim() === '' || role.trim() === '') {
            e.preventDefault();
            alert('Please fill in all fields');
        }
    }

    // Dynamic form fields for registration
    const roleSelect = document.querySelector('#register select[name="role"]');
    const trainerIdField = document.querySelector('#register input[name="trainer_id"]');
    const memberIdField = document.querySelector('#register input[name="member_id"]');

    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            if (this.value === 'Trainer') {
                trainerIdField.style.display = 'block';
                memberIdField.style.display = 'none';
            } else {
                trainerIdField.style.display = 'none';
                memberIdField.style.display = 'block';
            }
        });
    }

    // Attendance marking functionality
    const attendanceForms = document.querySelectorAll('#trainer-dashboard form');

    attendanceForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('/mark_attendance', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Attendance marked successfully');
                } else {
                    alert('Error marking attendance');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while marking attendance');
            });
        });
    });
});

// Function to show login success message
function showLoginSuccess() {
    const message = document.createElement('div');
    message.textContent = 'Login Successful';
    message.classList.add('success-message');
    document.body.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Function to show registration success message
function showRegistrationSuccess() {
    const message = document.createElement('div');
    message.textContent = 'Registration Successful. Please login.';
    message.classList.add('success-message');
    document.body.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Function to show "Please register first" message
function showPleaseRegisterMessage() {
    const message = document.createElement('div');
    message.textContent = 'Please register first';
    message.classList.add('error-message');
    document.body.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 3000);
}



//header section sidebar
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  }
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}







