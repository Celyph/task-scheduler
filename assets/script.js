// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // const savebtn = document.getElementById("savebtn");
  // savebtn.addEventListener("click", function(){
  //   console.log("Brie");
  // })
$(".btn").click(function(event){
  console.log($(this).parent("div").attr("id"))
  // console.log($(this).siblings("div")[0])
})

// $("#savebtn")
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  $(".btn").click(function(event) {
    const timeBlock = $(this).parent("div").attr("id");
    const data = $(`#data-${timeBlock}`).val();
    console.log(`saved data-${timeBlock} to localStorage: ${data}`);
    localStorage.setItem(`data-${timeBlock}`, data);
  })

  $(document).ready(function() {
    $("textarea").each(function() {
      const timeBlock = $(this).parent("div").attr("id");
      console.log(`loading timeBlock: ${timeBlock}`);
      const data = localStorage.getItem(`data-${timeBlock}`);
      $(this).val(data);
    })

    $(".row").each(function() {
      const now = dayjs();
      console.log(`current hour is ${now.hour()}`);
      const timeBlock = String($(this).attr("id"));
      const blockHour = Number(timeBlock.substring(5));
      if (now.hour() < blockHour) {
        // future
        $(this).addClass("future")
      } else if (now.hour() === blockHour) {
        // present
        $(this).addClass("present")
      } else {
        // past
        $(this).addClass("past")
      }
    })
  })
});
