const apiUrl = 'https://strapi-shopitem.onrender.com';

// Fetch product data from Strapi API
async function fetchProductData() {
  try {
    const response = await fetch(`${apiUrl}/api/shopitems?populate=*`, {
      headers: {
        Authorization: 'Bearer c56950b08565710b121ab6cb1dd36582d8d4e83558c976d95b78318992db92548454f863a90136165a6eeb078e90f85695a13ab3dc0c41101f6f9aeb04734592b8ed9710edef14a83a8001d027d541d2c272ff1ed81e23098fd75d8da9ff4812d778f110d97dd4db90e6b46e4840fa90401ea07178cfd3ee8573240a4ac8307c'  // Replace with your API token
      }
    });
    const productData = await response.json();

    if (Array.isArray(productData.data)) {
        console.log( productData.data);
      return productData.data;
    } else {
      console.error('Invalid product data format:', productData);
      return [];
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
}

// Generate product list HTML
function generateProductListHTML(productData) {
  let productListHTML = '';

  productData.forEach(item => {
    const imageUrl = item.attributes.image.data.attributes.url;
    const productItemHTML = `
      <div class="product-item">
        <h3 class="product-title">${item.attributes.title}</h3>
        <img class="product-image" src="${imageUrl}" alt="${item.attributes.title}">
      </div>
    `;
    productListHTML += productItemHTML;
  });

  return productListHTML;
}

// Main function to fetch data and generate product list
async function init() {
  const productData = await fetchProductData();
  const productList = document.getElementById('product-list');
  const productListHTML = generateProductListHTML(productData);
  productList.innerHTML = productListHTML;
}

init();
