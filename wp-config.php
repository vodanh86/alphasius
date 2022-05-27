<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'alphasius' );

/** Database username */
define( 'DB_USER', 'mvp' );

/** Database password */
define( 'DB_PASSWORD', 'abc@123' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'kDd<vD:^;|(mdkQHu:&taKz41gW0>8<kejRn!&NKMH:3E%85~]$%M/^a7z6k#=Lx' );
define( 'SECURE_AUTH_KEY',  'Rx4wy&!DTDb9&:A<@p`R%ks.0y0nZE)P*iF|w;W/3.L1g[P3FC^f}03NfB>3btT:' );
define( 'LOGGED_IN_KEY',    ' *.IWhT7H>d_nfwu=AT%YxaN? IWmr^y!VQJb#`_>8F_UO%D@kyz]fILE$uG`U+s' );
define( 'NONCE_KEY',        '{52:*VEixD418jl}YLju4$z]zroH_Z~CV:0g@;lQJ?p3/Y;p/.a^~<7VF85%OZtL' );
define( 'AUTH_SALT',        'mHk7q0<C|>8j#7r3y~|{P2}BAqfUw^OC5kVCS/@~c&-k5SPmEZ(t~Y/Q#WUAJD$s' );
define( 'SECURE_AUTH_SALT', '=T<=uYRjD=0Zbw=aC>.{|wMA:BM1=V7])t,LI` -:9>C:B-y#1}`}fvv xN%z0A7' );
define( 'LOGGED_IN_SALT',   'lzp-;h*}S8qz1|$EoVCkI:xF7.hm;Y(B}c.,W^1h/!QhQfuRk?$<-U&(5=71d9su' );
define( 'NONCE_SALT',       '8yLC3^be~:+8+gR;@SmX<M=sB1f%f=Tuctl;GTITzEx!s*c>$I3kX996W~i74w)s' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

