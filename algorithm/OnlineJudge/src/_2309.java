import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class _2309 {
    public static void main(String[] args) {
        // Brute force
        List<Integer> dwarfs = new ArrayList<>();
        int sum = 0;
        Scanner sc = new Scanner(System.in);

        for (int i = 0; i < 9; i++) {
            dwarfs.add(sc.nextInt());
            sum += dwarfs.get(i);
        }

//        for (int i = 0; i < dwarfs.size(); i++) {
//            for (int j = i + 1; j < dwarfs.size(); j++) {
//                if (sum - dwarfs.get(i) - dwarfs.get(j) == 100) {
//                    dwarfs.set(i, -100);
//                    dwarfs.set(j, -100);
//                }
//            }
//        }
//
//        dwarfs.sort(null);
//
//        for (Integer dwarf : dwarfs) {
//            if (dwarf == -100) continue;
//            System.out.println(dwarf);
//        }
//
//        반례)
//        73
//        1
//        2
//        3
//        4
//        5
//        6
//        7
//        8




    }
}
