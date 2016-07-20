$(function () {

	$('#amount').maskMoney({
		prefix: '$',
		precision: 0
	});

	var $form = $('#payment-form');
	$form.submit(function (event) {
		resetForm();
		// Disable the submit button to prevent repeated clicks:
		$form.find('.submit').prop('disabled', true);

		// Request a token from Stripe:
		Stripe.card.createToken($form, stripeResponseHandler);

		// Prevent the form from being submitted:
		return false;
	});
});


function stripeResponseHandler(status, response) {
	// Grab the form:
	var $form = $('#payment-form');

	if (response.error) { // Problem!

		// Show the errors on the form:
		$form.find('.payment-errors').text(response.error.message);
		$form.find('.submit').prop('disabled', false); // Re-enable submission

	} else { // Token was created!

		// Get the token ID:
		var token = response.id;

		// Insert the token ID into the form so it gets submitted to the server:
		$form.append($('<input type="hidden" name="stripeToken">').val(token));

		// Submit the form:


		$.ajax({
			method: "POST",
			url: $('#payment-form').attr('action'),
			data: $form.serialize()
		})
			.done(function (data) {
				if (data && data.success) {
					$form.addClass('complete success');
				} else {
					$form.addClass('complete fail');
				}
			});
	}
};


function resetForm() {
	var $form = $('#payment-form');
	$form.removeClass('complete fail success');
	$form.find('.submit').prop('disabled', false); // Re-enable submission

};
