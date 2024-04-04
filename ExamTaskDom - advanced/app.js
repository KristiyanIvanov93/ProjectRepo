window.addEventListener("load", solve);

function solve() {
  const inputs = {
    snowManName: document.getElementById('snowman-name'),
    snomanHeight: document.getElementById('snowman-height'),
    location: document.getElementById('location'),
    creatorName: document.getElementById('creator-name'),
    specialAttributes: document.getElementById('special-attribute')

  };
  const snowmanPreview = document.querySelector('.snowman-preview');
  const snowList = document.querySelector('.snow-list');


  const addBtn = document.querySelector(".add-btn");
  addBtn.addEventListener('click', onAddClick);

  function onAddClick(event) {
    event.preventDefault();

    if (inputs.snowManName.value === '' ||
      inputs.snomanHeight.value === '' ||
      inputs.location.value === '' ||
      inputs.creatorName.value === '' ||
      inputs.specialAttributes.value === '') {
      return;
    }

    const snowManName = inputs.snowManName.value;
    const snomanHeight = Number(inputs.snomanHeight.value);
    const location = inputs.location.value;
    const creatorName = inputs.creatorName.value;
    const specialAttributes = inputs.specialAttributes.value;

    addBtn.parentElement.reset();
    addBtn.disabled = true;

    const result = createPreview(snowManName, snomanHeight, location, creatorName, specialAttributes);
    snowmanPreview.appendChild(result);
  }

  function createInfo(snowManName, snomanHeight, location, creatorName, specialAttributes) {
    const listItem = el('li');
    listItem.className = 'snowman-info';

    const article = el('article');
    article.appendChild(el('p', `Name: ${snowManName}`));
    article.appendChild(el('p', `Height: ${snomanHeight}`));
    article.appendChild(el('p', `Location: ${location}`));
    article.appendChild(el('p', `Creator: ${creatorName}`));
    article.appendChild(el('p', `Attribute: ${specialAttributes}`));

    listItem.appendChild(article);

    return listItem;
  }
  function createPreview(snowManName, snomanHeight, location, creatorName, specialAttributes) {
    const listItem = createInfo(snowManName, snomanHeight, location, creatorName, specialAttributes);
    const btnContainer = el('div');
    btnContainer.className = 'btn-container';
    const editBtn = el('button', 'Edit');
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => onEditClick(snowManName, snomanHeight, location, creatorName, specialAttributes));
    const nextBtn = el('button', 'Continue');
    nextBtn.className = 'next-btn';
    nextBtn.addEventListener('click', () => onNextClick(snowManName, snomanHeight, location, creatorName, specialAttributes));
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(nextBtn);
    listItem.appendChild(btnContainer);
    return listItem;
  }

  function onEditClick(snowManName, snomanHeight, location, creatorName, specialAttributes) {
    inputs.snowManName.value = snowManName;
    inputs.snomanHeight.value = snomanHeight;
    inputs.location.value = location;
    inputs.creatorName.value = creatorName;
    inputs.specialAttributes.value = specialAttributes;

    snowmanPreview.textContent = '';
    addBtn.disabled = false;
  }
  function onNextClick(snowManName, snomanHeight, location, creatorName, specialAttributes) {
    const result = createConfirmation(snowManName, snomanHeight, location, creatorName, specialAttributes);
    snowList.appendChild(result);
    snowmanPreview.textContent = '';
  }
  function createConfirmation(snowManName, snomanHeight, location, creatorName, specialAttributes) {
    const element = createInfo(snowManName, snomanHeight, location, creatorName, specialAttributes);

    const sendBtn = el('button', 'Send');
    sendBtn.className = 'send-btn';
    sendBtn.addEventListener('click', onSendClick);
    const article = element.querySelector('article');
    article.appendChild(sendBtn);



    return element;
  }
  function onSendClick() {
    const mainElement = document.querySelector('main');
    mainElement.remove();

    const backButton = el('button', 'Back');
    backButton.id = 'back-btn';
    backButton.addEventListener('click', onBackClick);
    document.body.appendChild(backButton);

    const backImg = document.getElementById('back-img');
    backImg.removeAttribute('hidden');

  }

  function onBackClick() {
    location.reload();
  }

  function el(type, content) {
    const element = document.createElement(type);

    if (content) {
      element.textContent = content;
    }
    return element;
  }

}