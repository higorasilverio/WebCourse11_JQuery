var round = 1;
var matrix_game = Array(3);

matrix_game['a'] = Array(3);
matrix_game['b'] = Array(3);
matrix_game['c'] = Array(3);

matrix_game['a'][1] = 0;
matrix_game['a'][2] = 0;
matrix_game['a'][3] = 0;

matrix_game['b'][1] = 0;
matrix_game['b'][2] = 0;
matrix_game['b'][3] = 0;

matrix_game['c'][1] = 0;
matrix_game['c'][2] = 0;
matrix_game['c'][3] = 0;

$(document).ready( function(){

	$('#btn_begin').click(function(){

		//validate the entry of the nicknames
		if ($('#in_player1').val() == '') {
			alert('Nickname for Player 1 was not inserted');
			return false;
		}
		if ($('#in_player2').val() == '') {
			alert('Nickname for Player 2 was not inserted');
			return false;
		}

		//show nicknames below the images
		$('#out_player1').html($('#in_player1').val());
		$('#out_player2').html($('#in_player2').val());

		//hide the inicial screen and show the game board
		$('#initial_page').hide();
		$('#stage_game').show();

	})

	$('.move').click( function(){

		var id_move = this.id;
		$('#'+id_move).off();
		move(id_move);

	} )

	function move(id_move){
		var icon = '';
		var point = 0;
		if ((round % 2) == 1){
			icon = 'url("img/marcacao_1.png")';
			point = -1;
		}
		else {
			icon = 'url("img/marcacao_2.png")';
			point = 1;
		}
		round++;
		$('#'+id_move).css('background-image', icon);
		var row_col = id_move.split('-');
		matrix_game[row_col[0]][row_col[1]] = point;
		verifyWinner();

	}

	function verifyWinner(){
		//verify horizontally
		var points = 0;
		for(var i = 1; i <= 3; i++){
			points += matrix_game['a'][i];
		}
		winner(points);
		points = 0;
		for(var i = 1; i <= 3; i++){
			points += matrix_game['b'][i];
		}
		winner(points);
		points = 0;
		for(var i = 1; i <= 3; i++){
			points += matrix_game['c'][i];
		}
		winner(points);
		//verify vertically
		for(var l = 1; l <= 3; l++){
			points = 0;
			points += matrix_game['a'][l];
			points += matrix_game['b'][l];
			points += matrix_game['c'][l];
			winner(points);
		}
		//verify diagonal
		points = 0;
		points = matrix_game['a'][1] + matrix_game['b'][2] + matrix_game['c'][3];
		winner(points);
		points = 0;
		points = matrix_game['a'][3] + matrix_game['b'][2] + matrix_game['c'][1];
		winner(points);
	}

	function winner(points){
		if (points == -3) {
			var player1 = $('#in_player1').val();
			alert(player1 + ' wins!');
			$('.move').off();
		}
		else if (points == 3) {
			var player2 = $('#in_player2').val();
			alert(player2 + ' wins!');
			$('.move').off();
		}
	}

} )