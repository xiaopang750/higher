class Loading {
  show() {
    let oLoading = $('[loading]');
    oLoading.addClass('show');
  }
  hide() {
    let oLoading = $('[loading]');
    oLoading.removeClass('show');
  }
}

export default Loading;
