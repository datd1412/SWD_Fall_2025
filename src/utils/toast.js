import toast from 'react-hot-toast';

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {number} duration - Duration in ms (default: 3500)
 */
export const showSuccess = (message, duration = 3500) => {
  toast.success(message, {
    duration,
    icon: '✓',
  });
};

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {number} duration - Duration in ms (default: 4000)
 */
export const showError = (message, duration = 4000) => {
  toast.error(message, {
    duration,
    icon: '✕',
  });
};

/**
 * Show loading toast
 * @param {string} message - Loading message
 * @returns {string} - Toast ID to dismiss later
 */
export const showLoading = (message = 'Đang xử lý...') => {
  return toast.loading(message);
};

/**
 * Show info/default toast
 * @param {string} message - Message to show
 * @param {number} duration - Duration in ms (default: 3500)
 */
export const showInfo = (message, duration = 3500) => {
  toast(message, {
    duration,
    icon: 'ℹ️',
  });
};

/**
 * Dismiss a specific toast
 * @param {string} toastId - Toast ID returned from showLoading
 */
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Dismiss all toasts
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};

/**
 * Show a promise-based toast
 * @param {Promise} promise - Promise to track
 * @param {object} messages - Messages for loading, success, and error states
 * @example
 * showPromise(
 *   api.post('/endpoint'),
 *   {
 *     loading: 'Đang tải...',
 *     success: 'Thành công!',
 *     error: 'Có lỗi xảy ra'
 *   }
 * )
 */
export const showPromise = (promise, messages) => {
  toast.promise(promise, messages, {
    duration: 4000,
  });
};

export default {
  showSuccess,
  showError,
  showLoading,
  showInfo,
  dismissToast,
  dismissAllToasts,
  showPromise,
};
