const path = require( 'path' );

const TerserPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

let config = {
	entry: [ './src/demo/demo.js', './src/demo/demo.css' ],
	output: {
		filename: 'demo.min.js',
		path: path.resolve( __dirname, 'demo' ),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
					},
				},
			}, {
				test: /\.(glsl)$/,
				loader: 'raw-loader',
			}, {
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				],
			},
		],
	},
	optimization: {
		minimize: false,
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: 'demo.min.css',
		} ),
	],
	resolve: {
		alias: {
			'vesuna': path.resolve( __dirname, './src/main.js' ),
		},
	},
};

module.exports = ( env, argv ) => {

	if ( argv.mode === 'development' ) return {
		...config,
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			static: {
				directory: path.resolve( __dirname, 'demo' ),
			},
			host: '192.168.1.10',
			port: 8080,
			historyApiFallback: true,
		},
	};

	return {
		...config,
		mode: 'production',
		optimization: {
			minimize: true,
			usedExports: true,
			minimizer: [ new TerserPlugin( { extractComments: false } ) ],
		},
	};

};
