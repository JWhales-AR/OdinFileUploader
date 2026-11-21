{
  description = "Devshell Declaration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
    dbConfig = {
      user = "root";
      password = "root";
      port = 5432;
      hostName = "localhost";
      dbName = "testing";
    };
    appConfig = {
      port = 8080;
    };
    connectSql = pkgs.writeShellScriptBin "connsql" ''
      ${pkgs.pgcli}/bin/pgcli \
        --user ${dbConfig.user} \
        --dbname ${dbConfig.dbName} \
        --host ${dbConfig.hostName}
    '';
  in {
    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [
          prisma-engines
          openssl
        ];
        packages = [
          connectSql
        ];
        shellHook = ''
          export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig"
          export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
          export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"

          export DB_USER="${dbConfig.user}"
          export DB_PASSWD="${dbConfig.password}"
          export DB_PORT="${toString dbConfig.port}"
          export DB="${dbConfig.dbName}"

          export PORT="${toString appConfig.port}"
        '';
      };
    };
  };
}
