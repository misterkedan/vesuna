const path = require( 'path' );

const optimization = {
	minimize: true,
};

const config = {

	build: {
		mode: 'production',
		entry: './src/main.js',
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'vesuna.min.js',
			library: {
				type: 'umd',
				name: 'vesuna',
				export: 'default'
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: [ /node_modules/ ],
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			]
		},
		optimization
	},

	demo: {
		mode: 'production',
		entry: './src/demo.js',
		output: {
			filename: 'main.js',
			path: path.resolve( __dirname, 'demo' ),
		},
		externals: {
			'dat.gui': 'dat.gui',
		},
		resolve: {
			alias: {
				'vesuna': './main.js'
			}
		},
		optimization,
	},

	dev: {
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			static: {
				directory: path.resolve( __dirname, 'demo' ),
			},
			host: '192.168.1.10',
			port: 8080,
			allowedHosts: 'all',
		},
	},

};

module.exports = ( env, argv ) => {

	const { build, demo, dev } = config;

	if ( argv.mode === 'development' ) return {
		...demo,
		...dev,
	};

	return [
		{
			...demo,
			externals: {
				...demo.externals,
				vesuna: 'vesuna'
			},
		},
		{
			...build,
			output: {
				...build.output,
				path: path.resolve( __dirname, 'demo/lib/' ),
			}
		},
		config.build
	];

};
