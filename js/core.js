(function (doc) {
  "use strict";

  var PetitionModalController = BaseModalController.extend({
    page_id: 'fuck-the-tpp',
    petition_headline: 'The TPP is bullshit and you have GOT to do something about it.',
    petition_content: 'Vote NO on the TPP',
    share_headline: 'awesome.',
    share_text: 'now, share this so more people see how fucking shitty the TPP is. (or, chip in $5 to help us spread the word)',
    init: function () {
      this.render();
      this.show();
    },
    render: function () {
      var
        overlay = this.base_render(),
        modal = $c('div'),
        close = $c('button'),
        petition = $c('div'),
        copy = $c('section'),
        petitionHeadline = $c('h2'),
        petitionContent = $c('p');

      modal.classList.add('modal', '_petition_modal');
      close.classList.add('close');

      petitionHeadline.textContent = this.petition_headline;
      petitionContent.textContent = this.petition_content;

      petition.id = 'petition';
      petition.innerHTML = this.petition_content;

      close.innerHTML = '&times;';

      copy.appendChild(petitionHeadline);
      copy.appendChild(petitionContent);

      modal.appendChild(close);
      modal.appendChild(copy);
      modal.appendChild(petition);

      overlay.firstChild.appendChild(modal);
      this.html(overlay);
      new EmailPetitionController({
        el: '#petition',
        page_id: this.page_id,
        onSend: function () {
          new ShareModalController({
            headline: this.share_headline,
            text: this.share_text
          });
        }
      });
    }
  });

  var
    petitionModalContent = {
      page_id: 'fuck-the-tpp',
      petition_headline: 'The TPP is bullshit and you have GOT to do something about it.',
      petition_content: 'Vote NO on the TPP',
      share_headline: 'awesome.',
      share_text: 'now, share this so more people see how fucking shitty the TPP is. (or, chip in $5 to help us spread the word)'
    };

  function firePetitionModal(e) {
    e.preventDefault();
    new PetitionModalController(petitionModalContent);
  }

  doc.querySelectorAll('[href="http://www.fightthetpp.org/"]')[0].addEventListener('click', firePetitionModal);
  doc.querySelectorAll('[href="http://www.fightthetpp.org/"]')[1].addEventListener('click', firePetitionModal);
  doc.getElementById('rejection').addEventListener('click', firePetitionModal);


  var counter = 0;
  function clickedAnotherThreeTimes (e) {
    counter++;
    if (counter === 3 || counter === 8) {
      new PetitionModalController({page_id: 'fuck-the-tpp', petition_content: 'The tpp is bullshit.'});
    }
  }
  doc.getElementById('another').addEventListener('click', clickedAnotherThreeTimes);


}(document));
