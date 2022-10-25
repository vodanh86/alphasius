<?php
/*
 * Application Banner (Google PlayStore / AppleStore)
 *
 * @package app-banner-sahu
 * @copyright Copyright (c) 2020, SAHU MEDIA®
*/


// Registriere Adminmenü
add_action( 'admin_menu', 'sahu_app_admin_menu' );
function sahu_app_admin_menu() {
    add_menu_page(
        __( 'Application Banner', 'app-banner-sahu' ),
        __( 'Application Banner', 'app-banner-sahu' ),
        'manage_options',
        'app-banner-sahu',
        'sahu_app_admin_page_contents',
        'dashicons-schedule',
        3
    );
}

// Lade Seiteninhalt + Einstellungen
function sahu_app_admin_page_contents() {
    ?>
    <h1> <?php esc_html_e( 'Application Banner - SAHU MEDIA ®', 'app-banner-sahu' ); ?> </h1>
    <form method="POST" action="options.php">
    <?php
		settings_fields( 'sahu-app-page' );
		do_settings_sections( 'sahu-app-page' );
		submit_button();
    ?>
    </form>
    <?php
}


add_action( 'admin_init', 'sahu_app_settings_init' );
function sahu_app_settings_init() {

    add_settings_section(
        'sahu_app_page_setting_section',
        __( 'Settings', 'app-banner-sahu' ),
        'sahu_app_setting_section_callback_function',
        'sahu-app-page'
    );

		add_settings_field(
		   'sahu_app_applestore_link',
		   __( 'APP-Store Links', 'app-banner-sahu' ),
		   'sahu_app_store_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_applestore_link' );
		
		add_settings_field(
		   'sahu_app_googlestore_link',
		   'sahu_app_store_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_googlestore_link' );		
		
		add_settings_field(
		   'sahu_app_googlestore_com',
		   'sahu_app_store_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_googlestore_com' );	
		
		add_settings_field(
		   'sahu_app_appname',
		   __( 'APP-Information', 'app-banner-sahu' ),
		   'sahu_app_appinfo_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_appname' );		
		
		add_settings_field(
		   'sahu_app_appslogan',
		   'sahu_app_appinfo_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_appslogan' );		

		add_settings_field(
		   'sahu_app_app_icon_url',
		   'sahu_app_appinfo_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_app_icon_url' );
			
		add_settings_field(
		   'sahu_app_color_code',
		   __( 'Background-Color', 'app-banner-sahu' ),
		   'sahu_app_color_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_color_code' );
		
		add_settings_field(
		   'sahu_app_color_code_font',
		   __( 'Font-Color', 'app-banner-sahu' ),
		   'sahu_app_color_font_markup',
		   'sahu-app-page',
		   'sahu_app_page_setting_section'
		);

		register_setting( 'sahu-app-page', 'sahu_app_color_code_font' );
}


function sahu_app_setting_section_callback_function() {
    echo '<p>';
	echo _e( 'Change the link to the PlayStore or AppleStore! With the Pro version, you can also change colors or the ICON.' , 'app-banner-sahu' );
	echo '</p>';
}


function sahu_app_store_markup() {
    ?>
    <input type="text" id="sahu_app_applestore_link" name="sahu_app_applestore_link" value="<?php echo get_option( 'sahu_app_applestore_link' ); ?>" placeholder="<?php _e( 'Appel Store Link' , 'app-banner-sahu' );?>">
	<input type="text" id="sahu_app_googlestore_link" name="sahu_app_googlestore_link" value="<?php echo get_option( 'sahu_app_googlestore_link' ); ?>" placeholder="<?php _e( 'Google Store Link' , 'app-banner-sahu' );?>">
	<input type="text" id="sahu_app_googlestore_com" name="sahu_app_googlestore_com" value="<?php echo get_option( 'sahu_app_googlestore_com' ); ?>" placeholder="<?php _e( 'APP-Package Name com.sahu.appname' , 'app-banner-sahu' );?>">
    <?php
}

function sahu_app_appinfo_markup() {
    ?>
    <input type="text" id="sahu_app_appname" name="sahu_app_appname" value="<?php echo get_option( 'sahu_app_appname' ); ?>" placeholder="<?php _e( 'APP-Name' , 'app-banner-sahu' );?>">
	<input type="text" id="sahu_app_appslogan" name="sahu_app_appslogan" value="<?php echo get_option( 'sahu_app_appslogan' ); ?>" placeholder="<?php _e( 'APP slogan or APP developer' , 'app-banner-sahu' );?>">
	<input type="text" id="sahu_app_app_icon_url" name="sahu_app_app_icon_url" value="<?php echo get_option( 'sahu_app_app_icon_url' ); ?>" placeholder="<?php _e( 'APPICON URL' , 'app-banner-sahu' );?>">
    <?php
}

function sahu_app_color_markup(){
	?>
	<input id="sahu_app_color_code" class="color-picker" name="sahu_app_color_code" type="color" value="<?php echo get_option( 'sahu_app_color_code' ); ?>" value="#f2f2f2" />
	<?php
}

function sahu_app_color_font_markup(){
	?>
	<input id="sahu_app_color_code_font" class="color-picker" name="sahu_app_color_code_font" type="color" value="<?php echo get_option( 'sahu_app_color_code_font' ); ?>" value="#ffffff" />
	<?php
}

