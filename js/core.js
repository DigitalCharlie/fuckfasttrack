(function (doc) {
  "use strict";

  var PetitionModalController = BaseShareModalController.extend({
    page_id: 'fuck-the-tpp',
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

      close.textContent = '⨉';

      modal.appendChild(close);
      modal.appendChild(petition);


      overlay.firstChild.appendChild(modal);
      this.html(overlay);
      new EmailPetitionController({
        el: '#petition',
        page_id: this.page_id,
        onSend: function (formData) {
          document.getElementById('petition').innerHTML = '<p>Thanks!</p>';

          new CallModalController({
            campaign: 'cisa-cloture-fax',
            zip: formData.zip,
            callScript: 'CISA is really a bad law. Please oppose it!'
          });
        }
      });
    }

  });

  doc.querySelector('.button.action').addEventListener('click', function (e) {
    e.preventDefault();
    new PetitionModalController({page_id: 'fuck-the-tpp'});
  });

}(document));
