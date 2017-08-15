class Toast {
  constructor() {
    this.showTime = 2000;
  }
  show(str) {
    this.text(str);
    $('[toast]').addClass('active');
    setTimeout(this.hide.bind(this), this.showTime);
  }
  hide() {
    $('[toast]').removeClass('active');
  }
  text(str) {
    $('[toast-text]').text(str);
  }
}

export default Toast;
