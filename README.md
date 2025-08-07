run files in vscode
use xampp and mysql
CREATE database
create tables :
{
1.users : id (int pri),username (varchar),password (varchar),email (uni,varchar),created_at (timestamp)
2.addresses : city (varchar),created_at (timestamp, curren...),full_address (text),id (PRI, int),phone (varchar),province (varchar),recipient_name (varchar),updated_at (timestamp, curren...),user_id (MUL, int)
3.orders : id (PRI, int),order_date (date, NULL, nullable),product_id (int, NULL, nullable),status (varchar, NULL, nullable),user_id (int, NULL, nullable)
4.products : description (text, NULL, nullable),id (PRI, int),image (varchar, NULL, nullable),name (varchar, NULL, nullable),price (decimal, NULL, nullable)
}

run database
run project by live server


NOTICE : THIS IS A TUTORIAL PROJECT NOT A COMPLETED
