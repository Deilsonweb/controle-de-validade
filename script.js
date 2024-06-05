document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('item-form');
  const itemList = document.getElementById('item-list');

  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const itemName = document.getElementById('item-name').value;
      const itemCode = document.getElementById('item-code').value;
      const itemExpiry = document.getElementById('item-expiry').value;

      const newItem = {
          name: itemName,
          code: itemCode,
          expiry: itemExpiry
      };

      addItemToList(newItem);
      saveItemToLocalStorage(newItem);
      form.reset();
  });

  itemList.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('delete')) {
          const listItem = event.target.parentElement;
          const itemName = listItem.querySelector('strong').textContent;
          deleteItemFromLocalStorage(itemName);
          listItem.remove();
      }
  });

  function addItemToList(item) {
      const listItem = document.createElement('li');
      const expiryDate = new Date(item.expiry);
      const currentDate = new Date();

      listItem.innerHTML = `
          <strong>${item.name}</strong> (${item.code}) - ${item.expiry}
          <button class="delete">Excluir</button>
      `;

      if (expiryDate < currentDate) {
          listItem.classList.add('item-expired');
      }

      itemList.appendChild(listItem);
  }

  function saveItemToLocalStorage(item) {
      const items = getItemsFromLocalStorage();
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
  }

  function deleteItemFromLocalStorage(itemName) {
      const items = getItemsFromLocalStorage().filter(item => item.name !== itemName);
      localStorage.setItem('items', JSON.stringify(items));
  }

  function getItemsFromLocalStorage() {
      return JSON.parse(localStorage.getItem('items')) || [];
  }

  function loadDataFromLocalStorage() {
      const items = getItemsFromLocalStorage();
      items.forEach(function(item) {
          addItemToList(item);
      });
  }

  loadDataFromLocalStorage();
});
