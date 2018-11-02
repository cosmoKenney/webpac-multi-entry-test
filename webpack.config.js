const path = require( "path" );
const webpack = require( "webpack" );

const clientRoot = path.resolve( __dirname, "./" );
const tsConfig = path.resolve( __dirname, './tsconfig.json' );

const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

var webpackConfig = {
	mode: 'development',
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				common: {
					test: /[\\/]scripts[\\/]/,
					minSize: 0
				}
			}
		}
	},
	//context: clientRoot,
	entry: {
		"index": "./modules/main/index",
		"module-one": "./modules/module-one/module-one"
	},
	output: {
		path: path.resolve( __dirname, "assets" ),
		filename: "js/[name].js",
		publicPath: "/assets"
		//pathinfo: true <-- defualts to true in dev/false in prod
	},
	resolve: {
		extensions: [ ".ts", ".js" ],
		modules: [
			clientRoot,
			"node_modules"
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'script-loader'
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin( ['assets/*.*', 'assets/js/*.*', 'assets/img/*.*', 'assets/css/*.*'], { verbose: true } ),
		new HtmlWebpackPlugin( {
			alwaysWriteToDisk: true,
			filename: "index.html",
			template: "modules/main/index.ejs",
			inject: 'body',
			chunksSortMode: "dependency",
			hash: true
		} )/*,
		new HtmlWebpackPlugin( {
			alwaysWriteToDisk: true,
			filename: "module-one.html",
			template: "modules/module-one/module-one.ejs",
			inject: 'body',
			chunksSortMode: "dependency",
			hash: true
		} )*/
	]
};
module.exports = webpackConfig;