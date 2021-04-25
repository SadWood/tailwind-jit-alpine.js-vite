import 'tailwindcss/tailwind.css'
import '@/style.css'
import alpine from 'alpinejs'

window.formData = () => {
  return {
    disabled: true,
    showMsg: false,
    text: 'message',
    handleInit() {
      console.log(this.text)
      console.log(this.$refs.button.disabled)
      this.$nextTick(() => {
        console.log(this.$refs.button.disabled)
      })
    },
    handleDisabled() {
      const { disabled } = this
      this.disabled = !disabled
      this.$refs.disabled.checked = !disabled
      this.$refs.enabled.checked = disabled
    },
  }
}
