var
  SourceMapConsumer = require( "source-map" ).SourceMapConsumer,
  fs = require( "fs" ),
  request = require( "request" ),
  program = require( "commander" ),
  sourceMapFile;

function rowCol( val ){
  return ( val || "" ).split( ":" ).map( Number );
}
function findPosition( content ){
  var mapping;
  try{
    mapping = JSON.parse( "" + content );
  }catch( x ){
    console.error( "oops cannot parse mapping file." );
    if( program.debug ){
      process.stderr.write( content );
    }
    process.exit( 1 );
  }
  var smc = new SourceMapConsumer( mapping );
  var originalPosition = smc.originalPositionFor({
    line: program.row || program.position[ 0 ],
    column: program.column || program.position[ 1 ]
  });
  console.log(JSON.stringify( originalPosition, null, 2 ) );
}

program
  .version( require( "./package.json" ).version )
  .usage( "[options] <source-map>" )
  .option( "-P, --position [n:n]", "row:column", rowCol, [ 1, 0 ] )
  .option( "-R, --row [n]", "row number" )
  .option( "-C, --column [n]", "column" )
  .option( "-D, --debug", "debug mode" )
  .parse( process.argv );

if( !program.args[0] ){
  console.error( "I need moar sourcemap. A file or an url!" );
  process.exit( 1 );
}

sourceMapFile = program.args[0];

if( (/http/).test( sourceMapFile ) ){
  request( sourceMapFile, {
    encoding: "utf8"
  },function( err, response, body ){
    if( err ){
      throw err;
    }
    findPosition( body );
  });
}
else{
  fs.readFile( sourceMapFile, {
    encoding: "utf8",
  }, function( err, body ){
    if( err ){
      throw err;
    }
    findPosition( body );
  });
}