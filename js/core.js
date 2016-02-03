(function (doc) {
  "use strict";

  var PetitionModalController = BaseShareModalController.extend({
    page_id: 'fuck-the-tpp',
    petition_content: 'The TPP is bullshit and you have GOT to do something about it.',
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
        petition = $c('div');

      modal.classList.add('modal', '_call_modal');
      close.classList.add('close');
      petition.id = 'petition';
      petition.innerHTML = this.petition_content;

      close.textContent = '⨉';

      modal.appendChild(close);
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
      petition_content: 'The tpp is bullshit.',
      share_headline: 'awesome.',
      share_text: 'now, share this so more people see how fucking shitty the TPP is. (or, chip in $5 to help us spread the word)',
    };

  function firePetitionModal(e) {
    e.preventDefault();
    new PetitionModalController(petitionModalContent);
  }

  doc.querySelectorAll('[href="http://www.fightthetpp.org/"]')[0].addEventListener('click', firePetitionModal);
  doc.querySelectorAll('[href="http://www.fightthetpp.org/"]')[1].addEventListener('click', firePetitionModal);

}(document));
