document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const umkmId = urlParams.get("id");
  const umkmDetailContainer = document.getElementById("umkm-detail-container");

  if (!umkmId) {
    umkmDetailContainer.innerHTML =
      '<p class="text-red-600 text-center py-8">ID UMKM tidak ditemukan di URL.</p>';
    return;
  }

  fetch("../data/umkm.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((umkmData) => {
      const umkm = umkmData.find((item) => item.id === umkmId);

      if (umkm) {
        umkmDetailContainer.innerHTML = `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <img src="../img/${umkm.gambarUtama}" alt="${
          umkm.nama
        }" class="w-full h-80 object-cover rounded-lg shadow-md mb-6 border border-gray-100">
                            ${
                              umkm.gambarLainnya &&
                              umkm.gambarLainnya.length > 0
                                ? `
                                <div class="grid grid-cols-2 gap-4 mt-4">
                                    ${umkm.gambarLainnya
                                      .map(
                                        (img) =>
                                          `<img src="../img/${img}" alt="${umkm.nama}" class="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-100">`
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
                            <p class="text-xl text-indigo-700 mb-6">${
                              umkm.jenisUsaha
                            }</p>

                            <h2 class="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">Deskripsi</h2>
                            <p class="text-gray-700 leading-relaxed mb-6">${
                              umkm.deskripsi
                            }</p>

                            <div class="mb-6 border-b pb-2 border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">Informasi Kontak & Lokasi:</h3>
                                <p class="text-gray-700 mb-1"><strong>No WA/Telp:</strong> <a href="https://wa.me/${umkm.noWaTelp.replace(
                                  /[^0-9]/g,
                                  ""
                                )}" target="_blank" class="text-green-700 hover:underline font-medium">${
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
                                <div class="mb-6 bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-md">
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
                                <div class="video-container rounded-lg shadow-md mb-6 border border-gray-100">
                                    <iframe src="${umkm.gmapsEmbed}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-lg"></iframe>
                                </div>
                            `
                                : ""
                            }

                            ${
                              umkm.youtubeLink
                                ? `
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">Video Profil:</h3>
                                <div class="video-container rounded-lg shadow-md border border-gray-100">
                                    <iframe src="${umkm.youtubeLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-lg"></iframe>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                `;
      } else {
        umkmDetailContainer.innerHTML =
          '<p class="text-red-600 text-center py-8">UMKM tidak ditemukan.</p>';
      }
    })
    .catch((error) => {
      console.error("Error fetching UMKM data:", error);
      umkmDetailContainer.innerHTML =
        '<p class="text-red-600 text-center py-8">Gagal memuat detail UMKM. Silakan coba lagi nanti.</p>';
    });
});
