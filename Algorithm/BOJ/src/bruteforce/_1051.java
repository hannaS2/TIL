package bruteforce;

import java.util.Scanner;

public class _1051 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int row = sc.nextInt();
        int column = sc.nextInt();
        sc.nextLine();

        char[][] numbers = new char[row][column];
        for (int i = 0; i < row; i++) {
            String rowNum = sc.nextLine();
            for (int j = 0; j < column; j++) {
                numbers[i][j] = rowNum.charAt(j);
            }
        }

        int result = 1;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < column; j++) {

                for (int n = 0; i + n < row && j + n < column; n++) {
                    if (numbers[i][j] == numbers[i][j + n] &&
                            numbers[i][j] == numbers[i + n][j] &&
                            numbers[i][j] == numbers[i + n][j + n]) {
                        result = Math.max(result, n + 1);
                    }
                }

            }
        }

        System.out.println(result * result);
    }
}
