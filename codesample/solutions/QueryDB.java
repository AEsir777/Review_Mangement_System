import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Scanner;
import java.sql.*;
import java.math.BigDecimal;

// sample input: localhost 50000 database_name username password
public class QueryDB {

    private Scanner input = new Scanner(System.in);
    private Connection connection = null;

    public QueryDB(String[] args) {

        // loading the DBMS driver
        try {
            Class.forName("com.ibm.db2.jcc.DB2Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("Missing DBMS driver.");
            e.printStackTrace();
        }


        try {
            // connecting to the a database
            connection = DriverManager
                    .getConnection("jdbc:db2:CS348");
            System.out.println("Database connection open.\n");

            // setting auto commit to false
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            System.out.println("DBMS connection failed.");
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        QueryDB menu = new QueryDB(args);
        menu.mainMenu();
        menu.exit();
    }

    public void exit() {

        try {
            // close database connection
            connection.close();
            System.out.println("Database connection closed.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void mainMenu() throws SQLException {

        mainMenu:
        while (true) {

            System.out.println("\n-- Actions --");
            System.out.println(
                    "Select an option: \n" +
                            "  1) Get your classes\n" +
                            "  2) Search your classmates\n" +
                            "  3) Major statistics of your class\n" +
                            "  0) Exit\n "
            );
            int selection = input.nextInt();
            input.nextLine();

            switch (selection) {
                case 1:
		    System.out.println("Please provide the user ID: ");
		    String userID = input.nextLine().trim();
                    this.getClassByUserID(userID);
                    break;
	        case 2:
		    System.out.println("Please provide the user ID: ");
		    String id = input.nextLine().trim();
		    System.out.println("Please provide the list of class names: ");
		    String classes = input.nextLine();		    
                    this.searchCommonClassmate(id, classes);
                    break;
                case 3:
		    System.out.print("Please provide the class name: ");
		    String myclass = input.nextLine();
                    this.getClassStatis(myclass);
                    break;
                case 0:
                    System.out.println("Returning...\n");
                    break mainMenu;
                default:
                    System.out.println("Invalid action.");
                    break;
            }
        }
    }

    // Q1.(1) 
    private void getClassByUserID(String userID) throws SQLException {
	//TODO: update the code below

	System.out.println(userID);
       
	String getSClass = "SELECT cname FROM enrolled WHERE snum = ?";	
	PreparedStatement getSClassStmt = connection.prepareStatement(getSClass);
	getSClassStmt.setString(1,userID);
	
	ResultSet sClassRs = getSClassStmt.executeQuery();


	//IMPORTANT: Try to print your final output betwwen these two lines ("**Start of Answer**" and ""End of Answer")
	//for example
	System.out.println("**Start of Answer**"); 
	while(sClassRs.next()){
	    System.out.println(sClassRs.getString(1));
	}
       	System.out.println("**End of Answer**"); 
	
	connection.commit();
	getSClassStmt.close();
	
    }

    //Q1.(2)
    private void searchCommonClassmate(String userID, String classes) throws SQLException{
	//TODO: update the code

	String[] classnames = classes.split(",");
	System.out.println(userID);
	for(int i=0;i<classnames.length;i++){
	    System.out.println(classnames[i].trim());
	}

	//IMPORTANT: Try to print your final output betwwen these two lines ("**Start of Answer**" and ""End of Answer")
	System.out.println("**Start of Answer**"); 
	//your answers here 
       	System.out.println("**End of Answer**"); 

    }

    //Q1.(3)
    private void getClassStatis(String myclass) throws SQLException{
	//TODO: update the code

	System.out.println(myclass);

	//IMPORTANT: Try to print your final output betwwen these two lines ("**Start of Answer**" and ""End of Answer")
	System.out.println("**Start of Answer**"); 
	//your answers here 
       	System.out.println("**End of Answer**"); 		
    }
    
}
