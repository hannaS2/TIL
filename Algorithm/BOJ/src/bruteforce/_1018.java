package bruteforce;

import java.util.Scanner;

public class _1018 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int row = sc.nextInt();
        int column = sc.nextInt();
        sc.nextLine();

        char[][] chessBoard = new char[row][column];
        for (int i = 0; i < row; i++) {
            String rowMap = sc.nextLine();
            for (int j = 0; j < column; j++) {
                chessBoard[i][j] = rowMap.charAt(j);
            }
        }

        // 8*8 체스판 두 경우를 미리 만들어 비교
        String[] whiteChess = new String[row];
        String[] blackChess = new String[row];
        for (int i = 0; i < row; i++) {
            if (i % 2 == 0) {
                whiteChess[i] = "WBWBWBWB";
                blackChess[i] = "BWBWBWBW";
            } else {
                whiteChess[i] = "BWBWBWBW";
                blackChess[i] = "WBWBWBWB";
            }
        }

        int whiteCount = 64;
        int blackCount = 64;
        for (int dx = 0; dx <= row - 8; dx++) {  // 가로로 이동 가능한 경우의 수
            for (int dy = 0; dy <= column - 8; dy++) {  // 세로로 이동 가능한 경우의 수

                int wCount = 0;
                int bCount = 0;
                // 체스판 한 칸씩 비교
                for (int i = 0; i < 8; i++) {
                    for (int j = 0; j < 8; j++) {
                        if (whiteChess[i].charAt(j) != chessBoard[i+dx][j+dy]) wCount++;
                        if (blackChess[i].charAt(j) != chessBoard[i+dx][j+dy]) bCount++;
                    }
                }

                whiteCount = Math.min(whiteCount, wCount);
                blackCount = Math.min(blackCount, bCount);
            }
        }

        System.out.println(Math.min(whiteCount, blackCount));


    }

}
