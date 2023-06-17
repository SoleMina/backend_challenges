// document.getElementById('next-page-button').addEventListener('click', function() {
//     fetch('/products?page=2') // Replace with your API endpoint for retrieving the next page
//       .then(response => response.json())
//       .then(data => {
//         const template = Handlebars.compile(document.getElementById('product-template').innerHTML);
//         const productList = document.getElementById('product-list');
//         productList.innerHTML = template({ products: data.products.docs });
        
//         // Enable/disable the button based on pagination data
//         const nextPageButton = document.getElementById('next-page-button');
//         nextPageButton.disabled = !data.products.hasNextPage;
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   });