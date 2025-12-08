[Full-Stack] Laravel/React 認証付きTodo管理システム

Laravel/React/MySQLをDockerで統合し、認証機能とREST APIを備えたSPA（Single Page Application）として開発しました。 このプロジェクトは、セキュアなRESTful APIの設計から、モダンなフロントエンド構築、AWS EC2へのデプロイを含むフルスタックな開発経験を証明するものです。

Features

User Authentication (Laravel Sanctum):

トークンベースのセキュアなログイン/ログアウト機能を実装。

認証トークンの有効期限切れをフロントエンドで検知し、自動ログアウト処理を実装。

SPAセキュリティのためのCSRF保護に対応。

Todo Management (RESTful API):

CRUD操作（作成、読み取り、更新、削除）をサポートするTodo専用API群。

認証済みユーザーのTodoのみを取得・操作可能（認可処理）。

Frontend (React):

ユーザビリティを考慮したUI/UX設計。

日本語の日付フォーマット（例: 2025年05月06日14時30分22秒）に対応。

Client-side validationと、ユーザーへの明確なフィードバック（成功: 緑、エラー: 赤）を実装。

Validation:

バックエンド（Laravel）とフロントエンド（React）の双方で厳格な入力検証を実施。

Database:

MySQL 8.0とEloquent ORMを使用し、usersとtodosテーブルを管理。

Tech Stack

Backend: Laravel 10.x, PHP 8.x

Frontend: React 18.x (Hooks), Vite (Build tool)

Database: MySQL 8.0.x

Authentication: Laravel Sanctum

Environment: Laravel Sail, Docker

Libraries:

Backend: Eloquent ORM, Laravel Sanctum

Frontend: Axios (HTTP requests), date-fns (日付処理)

Deployment

AWS EC2環境（Amazon Linux 2023）へのデプロイおよび運用経験。

環境構築: Docker ComposeによるNginx/PHP/MySQLコンテナの起動・設定。

ネットワーク: AWSのセキュリティグループ設定、固定IP割り当て。

セキュリティ: Let's Encryptを用いたHTTPS化（SSL/TLS）に対応済み。

Setup Instructions

Clone the repository:
   bash    git clone git@github.com:jiro-nakamura/nakamura-todo.git    cd nakamura-todo    

Docker環境の起動と依存関係のインストール:
   - Dockerコンテナを起動し、バックエンドの依存関係（Composer）を自動インストールします。
   bash    ./vendor/bin/sail up -d    

フロントエンドの依存関係をインストール:
   bash    ./vendor/bin/sail npm install    

Set up environment:
   - Copy .env.example to .env:
     bash      cp .env.example .env      
   - .envファイルを編集し、アプリケーションの環境変数を設定します。

Generate application key:
   bash    ./vendor/bin/sail artisan key:generate    

Run migrations:
   bash    ./vendor/bin/sail artisan migrate    

Build the frontend (本番環境用):
   bash    ./vendor/bin/sail npm run build    

Access the application:
   - Open http://localhost in your browser.
   - API endpoints are available at http://localhost/api.

API Testing

Postmanなどのツールを使用し、/api/register または /api/login で取得したトークンを Authorization: Bearer <token> ヘッダーに設定してAPIをテストします。

Challenges and Solutions

Issue: Call to undefined method User::createToken() in AuthController
  - Solution: UserモデルにHasApiTokensトレイトを追加。
  - Learning: Sanctumのトークンベース認証の仕組みとモデルトレイトの理解。

Issue: Call to undefined method TodoController::middleware() in TodoController
  - Solution: auth:sanctumミドルウェアをroutes/api.phpに移動。
  - Learning: Laravelのミドルウェアの適切な適用場所とルートグルーピング。

Issue: Call to undefined method User::todos() in TodoController
  - Solution: UserモデルにhasManyリレーションを追加。
  - Learning: Eloquentリレーション（hasMany、belongsTo）の習得。

Issue: フロントエンドでの入力チェック漏れによる422エラー。
  - Solution: Todo.jsxにクライアントサイドバリデーションを実装し、UXを改善。
  - Learning: フロントエンドとバックエンド双方での適切なバリデーションの実装。

Issue: Docker環境でのビルド時間の長期化（約20分）。
  - Solution: Dockerキャッシュのクリア（docker system prune -a）とWSLリソースの最適化を実施。
  - Learning: Dockerリソース管理とパフォーマンスチューニングの基礎。

Future Improvements

Integrate Tailwind CSS for aより洗練された、レスポンシブなデザインの実現。

Add unit tests with PHPUnit (backend) and Jest (frontend)。

Implement todo categories, sorting, and filtering options for enhanced functionality。

About Me

Webエンジニアへのキャリアチェンジを目指す、IT経験2年の開発者です。このプロジェクトを通じて、モダンなフレームワークの学習能力、セキュアなフルスタックアプリケーションの構築スキル、そして複雑な技術課題を自力で解決する能力を示しています。

Contact: jrojirojiro@live.jp

GitHub: jiro-nakamura

License

MIT License
