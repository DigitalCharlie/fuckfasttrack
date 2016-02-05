(function (doc) {
  "use strict";

  var PetitionModalController = BaseModalController.extend({
    page_id: 'fuck-the-tpp',
    petition_content: 'Vote NO on the TPP',
    share_headline: 'Well that was fucking awesome. Now spread the goddamn word.',
    share_text: 'Share this so more people see how fucking shitty the TPP is. Or, chip in $5 to help us spread the word, probably with ads.',
    petitionSubmitText: 'Submit',
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

      petitionContent.textContent = this.petition_content;

      petition.id = 'petition';
      petition.innerHTML = this.petition_content;

      close.innerHTML = '&times;';

      if (this.petitionHeadline) {
        petitionHeadline.textContent = this.petition_headline;
        copy.appendChild(petitionHeadline);
      }

      copy.appendChild(petitionContent);

      modal.appendChild(close);
      modal.appendChild(copy);
      modal.appendChild(petition);

      overlay.firstChild.appendChild(modal);
      this.html(overlay);
      var that = this;
      new EmailPetitionController({
        el: '#petition',
        buttonText: this.petitionSubmitText,
        page_id: this.page_id,
        onSend: function () {
          that.hide();
          new ShareModalController({
            headline: that.share_headline,
            text: that.share_text
          });
        }
      });
    }
  });

  var
    petitionModalContent = {
      page_id: 'fuck-the-tpp',
//      petition_headline: 'The TPP is bullshit and you have GOT to do something about it.',
      petition_content: 'Tell Congress: Vote FUCK NO on the TPP',
      share_headline: 'Well that was fucking awesome.',
      share_text: 'Now share this and spread the goddamn word. Or chip in $5 to help us spread the word (probably with some fucking ads).',
      petitionSubmitText: 'take fucking action'

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
      new PetitionModalController({page_id: 'fuck-the-tpp', petition_content: 'Tell Congress: Vote HELL FUCKING NO on the TPP'});
    }
  }
  doc.getElementById('another').addEventListener('click', clickedAnotherThreeTimes);


}(document));
