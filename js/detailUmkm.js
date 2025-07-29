//KKN BN

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const umkmId = urlParams.get("id");
  const umkmDetailContainer = document.getElementById("umkm-detail-container");

  if (!umkmId) {
    umkmDetailContainer.innerHTML =
      '<p class="text-red-600 text-center py-8">ID UMKM tidak ditemukan di URL.</p>';
    return;
  }

  // Add loading state
  umkmDetailContainer.innerHTML = `
        <div class="text-center text-gray-600 py-8">
            <svg class="animate-spin h-8 w-8 text-gray-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat detail UMKM...
        </div>
    `;

  fetch("../data/umkm.json")
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((umkmData) => {
      const umkm = umkmData.find((item) => item.id === umkmId);

      if (umkm) {
        // Konversi nama UMKM menjadi format folder (literal)
        const umkmFolderName = umkm.nama; // Gunakan nama UMKM secara literal
        const gambarUtamaPath = `../img/${umkmFolderName}/${umkm.gambarUtama}`;

        umkmDetailContainer.innerHTML = `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <img src="${gambarUtamaPath}" alt="${
          umkm.nama
        }" class="w-full h-80 object-cover rounded-lg shadow-md mb-6 border border-gray-100">
                            ${
                              umkm.gambarLainnya &&
                              umkm.gambarLainnya.length > 0
                                ? `
                                <div class="grid grid-cols-2 gap-4 mt-4">
                                    ${umkm.gambarLainnya
                                      .map(
                                        (imgPath) =>
                                          `<img src="../img/${umkmFolderName}/${imgPath}" alt="${umkm.nama}" class="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-100">`
                                      )
                                      .join("")}
                                </div>
                            `
                                : ""
                            }
                        </div>
                        <div>
                            <h1 class="text-4xl font-extrabold text-gray-900 mb-4">${
                              umkm.nama
                            }</h1>
                            <p class="text-xl text-gray-700 mb-6">${
                              umkm.jenisUsaha
                            }</p>

                            ${
                              umkm.youtubeLink
                                ? `
                                <div class="mb-6">
                                    <button id="toggleVideoButton" class="flex items-center text-gray-700 hover:text-black font-semibold mb-2 transition-colors duration-200 focus:outline-none">
                                        <span id="buttonText">Tampilkan Video Profil</span>
                                        <svg id="buttonIcon" class="w-5 h-5 ml-2 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    <div id="videoContainer" class="video-section-hidden overflow-hidden transition-all duration-500 ease-in-out">
                                        <div class="video-wrapper rounded-lg shadow-md border border-gray-100">
                                            <iframe src="${umkm.youtubeLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-lg"></iframe>
                                        </div>
                                    </div>
                                </div>
                            `
                                : ""
                            }

                            <h2 class="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">Deskripsi</h2>
                            <p class="text-gray-700 leading-relaxed mb-6">${
                              umkm.deskripsi
                            }</p>

                            <div class="mb-6 border-b pb-2 border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">Informasi Kontak & Lokasi:</h3>
                                <p class="text-gray-700 mb-1"><strong>No WA/Telp:</strong> <a href="https://wa.me/${umkm.noWaTelp
                                  .replace(/[^0-9]/g, "")
                                  .split(",")[0]
                                  .trim()}" target="_blank" class="text-gray-700 hover:text-black hover:underline font-medium">${
          umkm.noWaTelp
        }</a></p>
                                <p class="text-gray-700 mb-1"><strong>Alamat:</strong> ${
                                  umkm.alamat
                                }</p>
                                <p class="text-gray-700 mb-1"><strong>Range Harga:</strong> ${
                                  umkm.rangeHarga
                                }</p>
                            </div>

                            ${
                              umkm.varian && umkm.varian.length > 0
                                ? `
                                <div class="mb-6 border-b pb-2 border-gray-200">
                                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Varian Produk/Layanan:</h3>
                                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                                        ${umkm.varian
                                          .map((varian) => `<li>${varian}</li>`)
                                          .join("")}
                                    </ul>
                                </div>
                            `
                                : ""
                            }

                            ${
                              umkm.catatan
                                ? `
                                <div class="mb-6 bg-gray-50 border-l-4 border-gray-400 text-gray-800 p-4 rounded-md">
                                    <p class="font-semibold">Catatan:</p>
                                    <p class="text-sm">${umkm.catatan}</p>
                                </div>
                            `
                                : ""
                            }

                            ${
                              umkm.gmapsEmbed
                                ? `
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">Lokasi di Google Maps:</h3>
                                <div class="video-wrapper rounded-lg shadow-md mb-6 border border-gray-100">
                                    <iframe src="${umkm.gmapsEmbed}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-lg"></iframe>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                `;

        // --- Video Toggle Logic (Existing) ---
        const toggleButton = document.getElementById("toggleVideoButton");
        const videoContainer = document.getElementById("videoContainer");
        const buttonIcon = document.getElementById("buttonIcon");
        const buttonText = document.getElementById("buttonText");

        if (toggleButton && videoContainer && buttonIcon && buttonText) {
          toggleButton.addEventListener("click", () => {
            if (videoContainer.classList.contains("video-section-hidden")) {
              videoContainer.classList.remove("video-section-hidden");
              videoContainer.classList.add("video-section-shown");
              buttonText.textContent = "Sembunyikan Video Profil";
              buttonIcon.classList.remove("rotate-0");
              buttonIcon.classList.add("rotate-180");
            } else {
              videoContainer.classList.remove("video-section-shown");
              videoContainer.classList.add("video-section-hidden");
              buttonText.textContent = "Tampilkan Video Profil";
              buttonIcon.classList.remove("rotate-180");
              buttonIcon.classList.add("rotate-0");
            }
          });
        }
      } else {
        umkmDetailContainer.innerHTML =
          '<p class="text-red-600 text-center py-8">UMKM tidak ditemukan.</p>';
      }
    })
    .catch((error) => {
      console.error("Error fetching UMKM data:", error);
      umkmDetailContainer.innerHTML = `
                <div class="text-center text-red-600 py-8">
                    <p>Maaf, gagal memuat detail UMKM.</p>
                    <p class="text-sm mt-2">Silakan periksa koneksi internet Anda atau coba lagi nanti.</p>
                    <p class="text-xs mt-1">(${error.message})</p>
                </div>
            `;
    });
});
