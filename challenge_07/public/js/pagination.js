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
document.getElementById('type-text').addEventListener("keyup", (e) =>  {
    if(e.key === "Enter") {
        let title = document.getElementById('type-text').value;
        console.log(title);
        fetch(`/products?title=${title}`)
        .then(data => {
            location.href = `http://localhost:8080/products?title=${title}`;
        })
        .catch(error => {
            console.log(error);
        });
    }
});