$(document).ready(function () {
  $("#text-div-replace").html("");
  function showToast() {
    document.getElementById("myToast").classList.remove("hidden");
    setTimeout(function () {
      document.getElementById("myToast").classList.add("hidden");
    }, 5000);
  }
  $("#submit_video").on("click", function () {
    var value = $(".link-video-value").val();
    if (value.split("?")[0] && value.split("/")[4].split("?")[0]) {
      value = value.split("?")[0];
      console.log(value.split("?")[0]);
    } else {
      console.log(value.split("?")[0]);
      showToast();
      return;
    }
    var spin = `<div class="flex  pt-4 items-center justify-center">
      <button type="button" class="flex items-center rounded-lg bg-sky-500 px-4 py-2 text-white" disabled>
      <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
      </svg>
      <span class="font-medium"> Đang tìm... </span>
      </button>
      </div>`;
    $("#text-div-replace").html(spin);

    const settings = {
      async: true,
      crossDomain: true,
      url: `https://instagram130.p.rapidapi.com/media-info-by-url?url=${value}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c5336c0802mshac468dbdde32a50p1df178jsn319514b6c46a",
        "X-RapidAPI-Host": "instagram130.p.rapidapi.com",
      },
    };

    $.ajax(settings)
      .fail(function () {
        $("#text-div-replace").html("");
        showToast();
        return;
      })
      .done(function (response) {
        data = response;
        $("#text-div-replace").html(`
    <div
    class="play-video  pt-0 items-center pb-[30px] justify-center flex flex-col  md:mr-[100px] lg:mr-[100px] lg:ml-[100px]  sm:mr-[100px] sm:ml-[100px] xl:ml-[300px] xl:mr-[300px] mr-[50px] ml-[50px]">
  <img src="${data.display_url}" alt ="đây là ảnh "/>

    <div class="flex justify-center  items-center flex-col">
       
        <a id="download-video" class="text-[23px] pt-3 pb-3 rounded-[10px] bg-cyan-500 p-3 cursor-pointer download-video" download="instagram.mp4"
            href="${data.display_url}"> Tải xuống video</a>
            <br>
    </div>

</div>
    `);
      });
  });
});
