<template >
   <div id="paypal-button-container"></div>
</template>

<script setup>
import { loadScript } from "@paypal/paypal-js";
import {mainStore} from '../../store.js'
const mainstore = mainStore();

loadScript({ "client-id": "AcLiBpncoxV9vgI9_-_p1JymsE0saX4TvmOBe2n_d-eC2dYt88xreE9DM85QeNhSqKq85GWsRcwHWYvJ" }).then((paypal) => {
      paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: `${mainstore.total}` // Can reference your dynamic pricing here
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
        onError: err => {
          console.error('PayPal Checkout onError', err);
        }
      }).render('#paypal-button-container');
    });
</script>