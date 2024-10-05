export const validateForm = (formData) => {
    // Destructure fields from the form data
    const { name, email, phone, address, company, website } = formData;
    
    // Regular expression pattern for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Regular expression pattern for validating phone (only digits)
    const phonePattern = /^[0-9]+$/;
    
    // Validate name: Must be present and at least 3 characters long
    if (!name || name.length < 3) return false;
    
    // Validate email: Must match the pattern for valid email format
    if (!email || !emailPattern.test(email)) return false;
    
    // Validate phone: Must contain only digits
    if (!phone || !phonePattern.test(phone)) return false;
    
    // Validate address: Street and city must be provided
    if (!address.street || !address.city) return false;
    
    // Optional company name validation: If provided, must be at least 3 characters long
    if (company.name && company.name.length < 3) return false;
    
    // Optional website validation: If provided, must start with "http"
    if (website && !website.startsWith('http')) return false;
    
    // If all checks pass, return true (valid form)
    return true;
};