<?php
/*
 * Application Banner (Google PlayStore / AppleStore)
 *
 * @package app-banner-sahu
 * @copyright Copyright (c) 2020, SAHU MEDIA®
*/

// Lade HTML Tags
add_action('wp_body_open', 'sahu_app_banner_body_tag', 10);
function sahu_app_banner_body_tag() {
	
	if(empty($_COOKIE['sahuapp_banner'])){
		
			if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == get_option( 'sahu_app_googlestore_com' )) {
			 $AndroidApp = $_SERVER['HTTP_X_REQUESTED_WITH'] == get_option( 'sahu_app_googlestore_com' );
			} else {
			 $AndroidApp = '';
			}
	
			$iPhoneBrowser  = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
			$iPadBrowser    = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
			$AndroidBrowser = stripos($_SERVER['HTTP_USER_AGENT'], "Android");
			$iOSApp = (strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile/') == false) && (strpos($_SERVER['HTTP_USER_AGENT'], 'Safari/') == false);
		
			if ($AndroidApp) {
				$typ = 1;
			}
			else if ($AndroidBrowser) {
				$typ = 2;
			}
			else if ($iOSApp) {
				$typ = 3;
			}
			else if($iPhoneBrowser || $iPadBrowser) {
				$typ = 4;
			}
			
			// Definiere Variablen
			
			if($typ == 2){
				$storetext = __( 'Now in the Google Play Store' , 'app-banner-sahu' );
				$storeurl  = get_option( 'sahu_app_googlestore_link' );
			}
		
			if($typ == 4){
				$storetext = __( 'Now in the Apple Store' , 'app-banner-sahu' );
				$storeurl  = get_option( 'sahu_app_applestore_link' );
			}	
			
			?>
			<style>
			@media only screen and (min-width:  786px)  {
				#app-banner{
					display: none;
				}
			}
			#app-banner{
				background-color: <?php print get_option('sahu_app_color_code');?>;
				color: <?php print get_option('sahu_app_color_code_font');?>;
				font-family:Arial, Helvetica, sans-serif;
				margin:0;
				padding:0;
				<?php if($typ == 1 OR $typ == 3){print 'display: none;';} ?>
				
			}
			#app-banner p{
				margin:0px;
			}
			#app-flex {
				display: flex;
				justify-content: space-around;
			}
			#app-middle-container {
				margin-top: 20px;
			}
			#app-first-container img {
				height: 50px;
				margin: 20px 0px;
				border-radius: 15px;
			}
			#app-last-container {
				margin-top: 33px;
			}
			#app-banner a {
				text-decoration: none;
				color: #fff;
				<?php if($typ == 2){print 'background-color: #02845e;';} ?>
				<?php if($typ == 4){print 'background-color: #0d73ff;';} ?>
				padding: 10px;
				border-radius: 20px;
			}
			#app-close-button {
				margin-top: 10px;
				cursor: pointer;
			}
			#app-slogan {
				margin-top: 5px;
				font-size: 14px;
			}
			#app-store {
				font-size: 10px;
				margin:0;
			}
			</style>
			
			<div id="app-banner">
				<div id="app-flex">
				  <div id="app-first-container">
					<?php 
						if(!empty(get_option( 'sahu_app_app_icon_url' ))){
							print '<img src="'.get_option( 'sahu_app_app_icon_url' ).'" alt="App Icon"/>';
						}else{
							print '<img src="'.plugin_dir_url( __FILE__ ).'/assets/placeholder.png" alt="App Icon"/>';
						}
					?>
				  </div>
				  <div id="app-middle-container">
					<p id="app-name"><?php echo get_option( 'sahu_app_appname' ); ?></p>
					<p id="app-store"><?php echo get_option( 'sahu_app_appslogan' ); ?></p>
					<p id="app-slogan"><?php print $storetext; ?></p> 
				  </div>
				  <div id="app-last-container">
					<a href="<?php echo $storeurl; ?>" target="_blank" onclick="ausblenden()"><?php _e( 'Download', 'app-banner-sahu' );?></a>
				  </div>
				  <div id="app-close-button" onclick="sahu_app_ausblenden()">
					&#10006;
					</div>
				</div>
			</div>
	<?php	
	}

}


// Lade JS Coockie Funktion

add_action('init', 'sahu_app_load_styles', 15);
function sahu_app_load_styles() {
    wp_enqueue_script( 'jquery_cookie', plugin_dir_url( __FILE__ ) . '/js.cookie.js', ['jquery'] );
  
}

// Lade Javascript zwecks Close-Funktion

add_action( 'wp_footer', 'sahu_app_banner_script_tag' );
function sahu_app_banner_script_tag(){
  ?>
	<script>
		function sahu_app_ausblenden () {
		  var ziel = document.querySelector('#app-flex');
		  ziel.outerHTML = "";
		  Cookies.set('sahuapp_banner', '1', { expires: 3 })
		}
	</script>
  <?php
}
?>