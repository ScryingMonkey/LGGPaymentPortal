/// <reference path="../../../../node_modules/@types/braintree-web/braintree-web.d.ts" />

import { Component, OnInit } from '@angular/core';

import { HubService } from '../../services/hub.service';

require('braintree-web');

@Component({
  selector: 'up-btcheckoutform',
  templateUrl: './btcheckoutform.component.html',
  styleUrls: ['./btcheckoutform.component.css']
})
export class BtCheckoutFormComponent implements OnInit {  
  // http://stackoverflow.com/questions/40353886/trying-to-integrate-braintree-web-into-angular2
  // We generated a client token for you so you can test out this code
  // immediately. In a production-ready integration, you will need to
  // generate a client token on your server (see section below).
  private form
  private authorization = 'sandbox_g42y39zw_348pk9cgf3bgyw2b';
  // private submit = document.querySelector('input[type="submit"]');
  private hostedFieldsInstance;//: BraintreeWeb.HostedFields;
  // clientInstance: BraintreeWeb.Client;

  constructor( private _hub:HubService ) { }

  ngOnInit() {
    let superThis = this;
    braintree.client.create({
      authorization: this.authorization
    }, function (clientErr, clientInstance) {
      // this.clientInstance = clientInstance;
      if (clientErr) {
        // Handle error in client creation
        console.log('...there has been an error during client creation!');
        console.error(clientErr);
        return;
      }
      superThis.createHostedFields(clientInstance);
      superThis.form = document.querySelector('#cardForm'); 
    });
  }
  createHostedFields(clientInstance) {
    let superThis = this;
    braintree.hostedFields.create({
      client: clientInstance,
      styles: { 
        'input': { 
          'font-size': '16px',
          'font-family': 'courier, monospace',
          'font-weight': 'lighter',
          'color': '#ccc' },
        ':focus': {
          'color': 'black' },
        'input.invalid': { 'color': 'red' },
        'input.valid': { 'color': 'green' }
      },
      fields: {
        number: {
          selector: '#card-number',
          placeholder: '4111 1111 1111 1111'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '123'
        },
        expirationDate: {
          selector: '#expiration-date',
          placeholder: 'MM/YYYY'
        },
        postalCode: {
          selector: '#postal-code',
          placeholder: '11111'
        }
      }
    }, 
    function (err, hostedFieldsInstance) {
        let teardown = function (event) {
          event.preventDefault();
          alert('Submit your nonce to your server here!');
          hostedFieldsInstance.teardown(function () {
            superThis.createHostedFields(clientInstance);
            superThis.form.removeEventListener('submit', teardown, false);
          });
        };
        superThis.hostedFieldsInstance = hostedFieldsInstance;
        console.log('...hostedFieldsInstance :' + hostedFieldsInstance);
        console.log('...this :'+ this);
        
        superThis.form.addEventListener('submit', teardown, false);
      });

  }


  ngOnDestroy() {
  //   if (this.hostedFieldsInstance) {
  //     this.hostedFieldsInstance.teardown(function (err) {
  //       if (err) {
  //         console.error('Could not tear down Hosted Fields!');
  //       } else {
  //         console.log('Hosted Fields has been torn down!');
  //       }
  //     });
  //   }
  }


}
