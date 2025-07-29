document.addEventListener("DOMContentLoaded", () => {
  const umkmListContainer = document.getElementById("umkm-list-container");

  // Clear previous loading message, add a better one before fetch
  umkmListContainer.innerHTML = `
        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100 col-span-full text-center text-gray-600">
            <svg class="animate-spin h-8 w-8 text-gray-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat daftar UMKM...
        </div>
    `;

  fetch("../data/umkm.json")
    .then((response) => {
      // Check if response is OK (status 200-299)
      if (!response.ok) {
        console.error("Gagal memuat data UMKM:", response.status);
        umkmListContainer.innerHTML =
          '<p class="text-center text-red-600 py-8">Gagal memuat daftar UMKM. Terjadi kesalahan pada server.</p>';
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((umkmData) => {
      umkmListContainer.innerHTML = ""; // Clear loading message

      if (!umkmData || umkmData.length === 0) {
        umkmListContainer.innerHTML =
          '<p class="text-center text-gray-600 col-span-full py-8">Belum ada data UMKM yang tersedia.</p>';
        return;
      }

      umkmData.forEach((umkm) => {
        // Konversi nama UMKM menjadi format folder (literal)
        const umkmFolderName = umkm.nama; // Gunakan nama UMKM secara literal
        const gambarUtamaPath = `../img/${umkmFolderName}/${umkm.gambarUtama}`;

        const umkmCard = `
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-102 hover:shadow-lg border border-gray-100">
                        <img src="${gambarUtamaPath}" alt="${umkm.nama}" class="w-full h-48 object-cover object-center border-b border-gray-100">
                        <div class="p-4">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">${umkm.nama}</h3>
                            <p class="text-sm text-gray-700 mb-2 line-clamp-1">${umkm.jenisUsaha}</p>
                            <p class="text-gray-600 text-sm mb-3 line-clamp-2">${umkm.deskripsi}</p>
                            <a href="detailUmkm.html?id=${umkm.id}" class="inline-block bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-full text-xs font-medium transition duration-200">
                                Lihat Detail
                            </a>
                        </div>
                    </div>
                `;
        umkmListContainer.innerHTML += umkmCard;
      });
    })
    .catch((error) => {
      console.error("Error dalam promise:", error);
      if (umkmListContainer.innerHTML.includes("Memuat daftar UMKM...")) {
        umkmListContainer.innerHTML =
          '<p class="text-center text-red-600 py-8">Gagal memuat daftar UMKM. Silakan coba lagi nanti.</p>';
      }
    });
});
