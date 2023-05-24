import java.sql.*;
import java.util.Scanner;

// sample input: localhost 5432 database_name username password
public class MaintainDB {

    private Scanner    input      = new Scanner(System.in);
    private Connection connection = null;

    public MaintainDB(String[] args) {

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
        MaintainDB menu = new MaintainDB(args);
        menu.mainMenu(args);
        menu.exit();
    }

    public void exit() {

        try {
            // close database connection
	    connection.commit();
            connection.close();
            System.out.println("Database connection closed.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void mainMenu(String[] args) throws SQLException {

        mainMenu:
        while (true) {

            System.out.println("\n-- Actions --");
            System.out.println(
                    "Select an option: \n" +
                            " 1) Add a class \n" +
                            " 2) Drop small classes \n" +
                            " 0) Exit\n "
            );
            int selection = input.nextInt();
            input.nextLine();

            switch (selection) {
	        case 1:
		    System.out.println("Please provide class info (name, meets_at, room, fid) separated with comma: ");
		    String classInfo = input.nextLine();		    
		    this.addClass(classInfo);
                    break;
                case 2:
		    System.out.println("Please provide the class size");
		    int classSize = input.nextInt();
                    this.dropSmallClass(classSize);
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

    
    //Q2.(1)
    private void addClass(String classInfo) throws SQLException {

	//TODO: update the code

	System.out.println(classInfo);
	
	//IMPORTANT: Try to print your final output between these two lines ("**Start of Answer**" and ""End of Answer")
	System.out.println("**Start of Answer**"); 
	//your answers here 
       	System.out.println("**End of Answer**"); 
    }

    //Q2.(2)
    private void dropSmallClass(int classSize) throws SQLException {
	//TODO: update the code

	System.out.println("Drop classes of size less than " +classSize);

	//IMPORTANT: Try to print your final output between these two lines ("**Start of Answer**" and ""End of Answer")
	System.out.println("**Start of Answer**"); 
	//your answers here 
       	System.out.println("**End of Answer**"); 

    }

}
